/**
 * AuthController отвечает за обработку HTTP-запросов:
 * принимает данные из запроса, вызывает методы сервиса,
 * формирует и возвращает HTTP-ответ.
 */


import { Request, Response } from "express";
import {authService} from "../services/authService";
import {validationResult} from "express-validator";
import {Types} from "mongoose";


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
            res.json(result);
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

            const { refreshToken } = req.body
            const result = await authService.refreshToken(refreshToken);
            res.json(result);
        } catch (e) {
            console.error(e);
            res.status(403).json({ message: "Ошибка обновленния токена" });
        }
    }

    async getUser(req: Request, res: Response): Promise<void> {
        try {
            const { accessToken } = req.body;

            const result = await authService.getUser(accessToken)
            res.json(result);
        } catch (e) {
            console.error(e);
            res.status(403).json({ message: "Возникла ошибка при поиске пользователя" });
        }
    }
}

export const authController = new AuthController();