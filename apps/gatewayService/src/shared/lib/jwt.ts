import jwt, { JwtPayload } from "jsonwebtoken";
import { settings } from "../config";

export interface IPayload extends JwtPayload {
    id: string;
}

export const verifyAccessToken = (accessToken: string): IPayload => {
    const verified = jwt.verify(accessToken, settings.authJWT.publicKey);

    if (typeof verified === "string") {
        throw new Error("Token payload is string, expected object");
    }

    const payload = verified as IPayload;

    if (!payload.id) {
        throw new Error("Token payload missing required 'id' field");
    }

    return payload;
};
