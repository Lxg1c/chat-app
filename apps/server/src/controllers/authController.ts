import { Request, Response } from "express";
import {authService} from "../services/authService";


export class AuthController {
    async registration(req: Request, res: Response): Promise<void> {
        return authService.registration(req, res)
    }

    async login(req: Request, res: Response): Promise<void> {
        return authService.login(req, res)
    }

    async refreshToken(req: Request, res: Response): Promise<void> {
        return authService.refreshToken(req, res)
    }
}

export const authController = new AuthController();