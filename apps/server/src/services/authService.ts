import {Request, Response} from "express";
import {validationResult} from "express-validator";
import {RoleModel, UserModel} from "../models";
import bcrypt from "bcryptjs";
import {generateAccessToken, generateRefreshToken, verifyRefreshToken} from "../utils/jwt.utils";

class AuthService {
    async registration(req: Request, res: Response): Promise<void> {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.status(400).json({ message: "Invalid credentials", errors });
                return;
            }

            const { username, password } = req.body;
            const candidate = await UserModel.findOne({ username });

            if (candidate) {
                res.status(400).json({ message: "Пользователь с таким именем уже существует" });
                return;
            }

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            const role = await RoleModel.findOne({ value: "USER" });
            if (!role) {
                res.status(400).json({ message: "Роль USER не найдена" });
                return;
            }

            const newUser = new UserModel({
                username,
                password: hashPassword,
                roles: [role._id]
            });

            await newUser.save();
            res.json({ message: "Пользователь успешно зарегистрирован" });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Ошибка регистрации" });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ message: "Invalid credentials", errors });
                return;
            }

            const { username, password } = req.body;
            const user = await UserModel.findOne({ username }).populate("roles");

            if (!user) {
                res.status(400).json({ message: "Неверный логин или пароль" });
                return;
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                res.status(400).json({ message: "Неверный логин или пароль" });
                return;
            }

            const roleValues = user.roles.map((role: any) => role.value);
            const accessToken = generateAccessToken(user._id.toString(), roleValues);
            const refreshToken = generateRefreshToken(user._id.toString());

            res.json({ accessToken, refreshToken });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Ошибка авторизации" });
        }
    }

    async refreshToken(req: Request, res: Response): Promise<void> {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                res.status(400).json({ message: "Refresh токен не предоставлен" });
                return;
            }

            const payload = verifyRefreshToken(refreshToken);
            const user = await UserModel.findById(payload.id).populate("roles");

            if (!user) {
                res.status(401).json({ message: "Пользователь не найден" });
                return;
            }

            const roleValues = user.roles.map((role: any) => role.value);
            const newAccessToken = generateAccessToken(user._id.toString(), roleValues);

            res.json({ accessToken: newAccessToken });
        } catch (e) {
            console.error(e);
            res.status(401).json({ message: "Неверный или истёкший refresh токен" });
        }
    }
}

export const authService = new AuthService();