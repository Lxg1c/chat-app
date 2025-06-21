import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (token: string): Socket => {
    if (!socket || !socket.connected) {
        socket = io("ws://localhost:5000", {
            query: { token }, // Токен передаётся как query-параметр
            transports: ["websocket"],
        });

        socket.on("connect", () => {
            console.log("✅ Подключено к Gateway WS");
        });

        socket.on("disconnect", () => {
            console.log("🔌 Отключено от WS");
        });

        socket.on("message", (msg) => {
            console.log("📩 Получено сообщение:", msg);
        });
    }

    return socket;
};
