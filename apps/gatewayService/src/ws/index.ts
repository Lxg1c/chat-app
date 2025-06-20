import { Server } from "socket.io";
import { handleSocketConnection } from "./handlers";

export const setupWebSocket = (httpServer: any) => {
    const io = new Server(httpServer, {
        cors: { origin: "*" },
    });

    io.on("connection", handleSocketConnection);
};
