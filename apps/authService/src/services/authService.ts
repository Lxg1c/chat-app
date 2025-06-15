/**
 * AuthService содержит бизнес-логику авторизации и работы с пользователями:
 * регистрация, вход в систему, обновление токена, получение пользователей.
 * Не взаимодействует напрямую с HTTP (req/res).
 */


import {RoleModel, UserModel} from "../models";
import bcrypt from "bcryptjs";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    verifyAccessToken
} from "../utils/jwt.utils";
import {Types} from "mongoose";
import {getChannel} from "../../../../packages/rabbitmq/rabbitmq";


class AuthService {
    async registration(username: string, password: string, phone: string, _id: Types.ObjectId): Promise<any> {
        const candidate = await UserModel.findOne({ username });
        if (candidate) {
            return { message: "Пользователь с таким именем уже существует" };
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const role = await RoleModel.findOne({ value: "ADMIN" });
        if (!role) {
            return { message: "Роль не найдена" };
        }

        const newUser = new UserModel({
            _id,
            username,
            password: hashPassword,
            roles: [role._id]
        });
        await newUser.save();

        // 📨 Отправляем данные в очередь
        const channel = await getChannel();
        const queue = "create_user_profile";

        const userData = {
            _id: _id.toString(),
            username,
            phone
        };

        await channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(userData)), { persistent: true });

        return { message: "Пользователь успешно зарегистрирован!" };
    }


    async login(username: string, password: string) {
        const user = await UserModel.findOne({ username }).populate("roles");

        if (!user) {
            return { message: "Неверный логин или пароль" };
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return { message: "Неверный логин или пароль" };
        }

        const roleValues = user.roles.map((role: any) => role.value);
        const accessToken = generateAccessToken(user._id.toString(), roleValues);
        const refreshToken = generateRefreshToken(user._id.toString());

        return {accessToken, refreshToken };
    }

    async refreshToken(refreshToken: string) {
        if (!refreshToken) {
            return { message: "Refresh токен не предоставлен" };
        }

        const payload = verifyRefreshToken(refreshToken);
        const user = await UserModel.findById(payload.id).populate("roles");

        if (!user) {
            return { message: "Пользователь не найден" };
        }

        const roleValues = user.roles.map((role: any) => role.value);
        const newAccessToken = generateAccessToken(user._id.toString(), roleValues);

        return { accessToken: newAccessToken };
    }

    async getUser(accessToken: string) {
        const decoded = verifyAccessToken(accessToken);
        return UserModel.findById(decoded.id).select("_id, username");
    }
}

export const authService = new AuthService();