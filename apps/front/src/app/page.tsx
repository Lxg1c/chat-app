'use client'

import {connectSocket} from "@/shared/lib/socket";
import {useEffect, useRef, useState} from "react";


export default function Home() {
    const [connected, setConnected] = useState(false);
    const socketRef = useRef<any>(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken"); // получаем токен
        if (!token) return;

        const socket = connectSocket(token);
        socketRef.current = socket;

        socket.on("connect", () => {
            setConnected(true);
            socket.emit("join", "chat123"); // пример присоединения к чату
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        socketRef.current?.emit("message", {
            chatId: "chat123",
            text: "Привет!",
        });
    };

    return (
        <div>
            <h1>Чат</h1>
            <p>{connected ? "🟢 Подключено" : "🔴 Отключено"}</p>
            <button onClick={sendMessage}>Отправить сообщение</button>
        </div>
    );
}
