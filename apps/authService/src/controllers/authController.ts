/**
 * AuthController отвечает за обработку HTTP-запросов:
 * принимает данные из запроса, вызывает методы сервиса,
 * формирует и возвращает HTTP-ответ.
 */


import { Request, Response } from "express";
import {authService} from "../services/authService";
import {validationResult} from "express-validator";
import {Types} from "mongoose";
import {verifyRefreshToken} from "../utils/jwt.utils";


export class AuthController {
    async registration(req: Request, res: Response): Promise<void> {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                console.error(errors);
                res.status(400).json({ message: "Неверный логин или пароль"});
                return;
            }

            const { username, password, phone } = req.body;

            const _id = new Types.ObjectId();
            const result = await authService.registration(username, password, phone, _id);
            res.json(result);
        } catch (e) {
            console.error(e);
            res.status(403).json({ message: "Ошибка регистрации" });
        }

    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ message: "Неверный логин или пароль", errors });
                return;
            }

            const {username, password} = req.body;
            const result = await authService.login(username, password);
            res
                .cookie('refreshToken', result.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                path: "api/v1/auth/login",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            })
                .json({accessToken: result.accessToken});
        } catch (e) {
            console.error(e);
            res.status(403).json({ message: "Ошибка авторизации" });
        }
    }

    async refreshToken(req: Request, res: Response): Promise<void> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ message: "Невалидный refresh-token", errors });
            }

            const { refreshToken } = req.cookies.refreshToken;
            const result = await authService.refreshToken(refreshToken);
            res.json({ accessToken: result.accessToken });
        } catch (e) {
            console.error(e);
            res.status(403).json({ message: "Ошибка обновленния токена" });
        }
    }

    async logout(req: Request, res: Response): Promise<void> {
        try {
            const refreshToken = req.cookies.refreshToken;

            if (!refreshToken) {
                res.status(400).json({ message: 'Refresh token not found in cookies' });
                return
            }

            const payload = verifyRefreshToken(refreshToken);
            if (!payload) {
                res.status(401).json({ message: 'Invalid refresh token' });
                return
            }

            // Очистить cookie на клиенте
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });

            res.status(200).json({ message: 'Logged out successfully' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Ошибка сервера" });
        }
    }
}

export const authController = new AuthController();