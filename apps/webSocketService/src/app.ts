import express from "express"
import http from "http";
import {Server} from "socket.io";


const app = express()
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" },
});

io.on("connection", (socket) => {
    const user = socket.handshake.query.user;
    console.log("User connected:", user);

    socket.on("join", (chatId) => {
        socket.join(chatId);
    });

    socket.on("message", async ({ chatId, text }) => {
        // const msg = await axios.post(`http://localhost:5001/chats/${chatId}/messages`, {
        //     user,
        //     text,
        // });
        // io.to(chatId).emit("message", msg.data);
        console.log("Отправлено сообщение", chatId, text);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", user);
    });
});


export default server
