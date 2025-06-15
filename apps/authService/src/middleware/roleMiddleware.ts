import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "./authMiddleware";
import jwt from "jsonwebtoken";
import { settings } from "../core/config";

interface JwtPayload {
    id: string;
    roles: string[];
}

export default function (roles: string[]) {
    return function (req: AuthenticatedRequest, res: Response, next: NextFunction): void {
        if (req.method === "OPTIONS") {
            return next();
        }

        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                res.status(401).json({ message: "No auth header found." });
                return;
            }

            const [bearer, token] = authHeader.split(' ');
            if (bearer !== 'Bearer' || !token) {
                res.status(401).json({ message: "Invalid token format" });
                return;
            }

            const payload = jwt.verify(token, settings.auth_jwt.privateKey) as JwtPayload;
            const userRoles = payload.roles;

            const hasRole = userRoles.some(role => roles.includes(role));

            if (!hasRole) {
                res.status(403).json({ message: "У вас нет доступа" });
                return;
            }

            return next();
        } catch (e) {
            console.log(e);
            res.status(403).json({ message: "Пользователь не авторизован" });
            return;
        }
    };
}
