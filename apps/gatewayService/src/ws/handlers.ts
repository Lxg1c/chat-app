import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { settings } from "../shared/config";
import { io as ClientIO } from "socket.io-client";

export const handleSocketConnection = (clientSocket: Socket) => {
    const tokenRaw = clientSocket.handshake.query.token;
    const token = Array.isArray(tokenRaw) ? tokenRaw[0] : tokenRaw;

    if (!token) return clientSocket.disconnect();

    try {
        const payload = jwt.verify(token, settings.authJWT.publicKey);
        const userId = typeof payload === "object" && "sub" in payload ? payload.sub : null;

        if (!userId) return clientSocket.disconnect();

        const backendSocket = ClientIO("http://localhost:5004", {
            query: { user: userId },
        });

        clientSocket.on("join", (chatId) => {
            backendSocket.emit("join", chatId);
        });

        clientSocket.on("message", (data) => {
            backendSocket.emit("message", data);
        });

        backendSocket.on("message", (msg) => {
            clientSocket.emit("message", msg);
        });

        clientSocket.on("disconnect", () => {
            backendSocket.disconnect();
        });

    } catch (e) {
        if (e instanceof Error) console.log("❌ Неверный токен:", e.message);
        clientSocket.disconnect();
    }
};
