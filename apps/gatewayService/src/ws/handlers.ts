import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { settings } from "../shared/config";
import { io as ClientIO } from "socket.io-client";
import { JwtPayload } from "jsonwebtoken";

interface IPayload extends JwtPayload {
    id: string;
}

export const handleSocketConnection = (clientSocket: Socket) => {
    try {
        const tokenRaw = clientSocket.handshake.query.token;
        const token = Array.isArray(tokenRaw) ? tokenRaw[0] : tokenRaw;

        if (!token) {
            console.log("❌ Токен не предоставлен");
            return clientSocket.disconnect();
        }

        let payload: IPayload;
        try {
            const verified = jwt.verify(token, settings.authJWT.publicKey);

            // Проверяем тип результата
            if (typeof verified === 'string') {
                return new Error("Token payload is string, expected object");
            }

            payload = verified as IPayload;

            if (!payload.id) {
                return new Error("Token payload missing required 'id' field");
            }
        } catch (e) {
            const error = e instanceof Error ? e : new Error("Unknown token verification error");
            console.log(`❌ Ошибка верификации токена: ${error.message}`);
            return clientSocket.disconnect();
        }

        console.log("✅ Успешная верификация токена, payload:", payload);
        const userId = payload.id;

        const backendSocket = ClientIO("http://localhost:5004", {
            query: { user: userId },
        });

        // Обработчики событий
        const messageHandler = (data: any) => {
            backendSocket.emit("message", data);
        };

        const joinHandler = (chatId: string) => {
            backendSocket.emit("join", chatId);
        };

        const backendMessageHandler = (msg: any) => {
            clientSocket.emit("message", msg);
        };

        const disconnectHandler = () => {
            backendSocket.disconnect();
            cleanup();
        };

        // Функция очистки
        const cleanup = () => {
            clientSocket.off("message", messageHandler);
            clientSocket.off("join", joinHandler);
            clientSocket.off("disconnect", disconnectHandler);
            backendSocket.off("message", backendMessageHandler);
        };

        // Подписываемся на события
        clientSocket.on("message", messageHandler);
        clientSocket.on("join", joinHandler);
        clientSocket.on("disconnect", disconnectHandler);
        backendSocket.on("message", backendMessageHandler);

        // Очистка при ошибках
        backendSocket.on("connect_error", (err) => {
            console.log(`❌ Ошибка подключения к бэкенду: ${err.message}`);
            cleanup();
            clientSocket.disconnect();
        });

    } catch (error) {
        const err = error instanceof Error ? error : new Error("Unknown socket connection error");
        console.log(`❌ Критическая ошибка обработки подключения: ${err.message}`);
        clientSocket.disconnect();
    }
};