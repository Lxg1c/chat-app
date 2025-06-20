import jwt, {JwtPayload, SignOptions} from "jsonwebtoken";
import {settings} from "../shared/config";

interface AccessPayload extends JwtPayload {
    id: string;
    roles: string[];
    type: 'access';
}

interface RefreshPayload extends JwtPayload {
    id: string;
    type: 'refresh';
}


export const generateAccessToken = (id: string, roles: string[]): string => {
    const payload: AccessPayload = { id, roles, type: "access" };

    return jwt.sign(payload, settings.auth_jwt.privateKey, {
        algorithm: settings.auth_jwt.algorithm,
        expiresIn: settings.auth_jwt.accessExpiresIn
    } as SignOptions);
};

export const generateRefreshToken = (id: string): string => {
    const payload: RefreshPayload = { id, type: "refresh" };

    return jwt.sign(payload, settings.auth_jwt.privateKey, {
        algorithm: settings.auth_jwt.algorithm,
        expiresIn: settings.auth_jwt.refreshExpiresIn
    } as SignOptions);
};

export const verifyRefreshToken = (token: string): RefreshPayload => {
    const decoded = jwt.verify(token, settings.auth_jwt.publicKey, {
        algorithms: [settings.auth_jwt.algorithm],
        issuer: 'your-app-name',
        audience: 'web-app'
    }) as RefreshPayload;

    if (decoded.type !== "refresh") {
        throw new Error("Invalid token type");
    }

    return decoded;
};

export const verifyAccessToken = (token: string): AccessPayload => {
    const decoded = jwt.verify(token, settings.auth_jwt.publicKey, {
        algorithms: [settings.auth_jwt.algorithm],
    }) as AccessPayload;

    if (decoded.type !== "access") {
        throw new Error("Invalid token type");
    }

    if (!decoded.roles || !Array.isArray(decoded.roles)) {
        throw new Error("Invalid roles in token");
    }

    return decoded;
};