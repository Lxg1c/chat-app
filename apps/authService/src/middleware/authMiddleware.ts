import jwt from "jsonwebtoken";
import {settings} from "../core/config";
import {NextFunction, Request, Response} from "express";

interface JwtPayload {
    id: string;
    roles: string[];
}

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export default function (roles: string[]) {
    return function (req: AuthenticatedRequest, res: Response, next: NextFunction) {
        if (req.method === "OPTIONS") {
            return next();
        }

        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                res.status(401).json({ message: "Authorization header is missing" });
                return;
            }

            const [bearer, token] = authHeader.split(' ');
            if (bearer !== 'Bearer' || !token) {
                res.status(401).json({ message: "Invalid token format" });
                return;
            }

            const payload = jwt.verify(token, settings.auth_jwt.publicKey, {
                algorithms: [settings.auth_jwt.algorithm]
            }) as JwtPayload;

            const hasRole = payload.roles.some(role => roles.includes(role));
            if (!hasRole) {
                res.status(403).json({ message: "У вас нет доступа" });
                return;
            }

            req.user = payload;
            next();
        } catch (e) {
            console.error(e);
            res.status(403).json({ message: "Пользователь не авторизован" });
            return;
        }
    };
}
