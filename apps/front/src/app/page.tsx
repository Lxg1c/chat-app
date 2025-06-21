'use client'

import { connectSocket } from "@/shared/lib/socket";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/entities/user/model/store";


export default function Home() {
    const [connected, setConnected] = useState(false);
    const socketRef = useRef<any>(null);
    const accessToken = useUserStore(state => state.accessToken);


    useEffect(() => {
        if (!accessToken) {
            console.error("Access token not set");
            return;
        }

        console.log("Current access token:", accessToken);

        const socket = connectSocket(accessToken);
        socketRef.current = socket;

        socket.on("connect", () => {
            setConnected(true);
            socket.emit("join", "chat123");
        });

        return () => {
            socket.disconnect();
        };
    }, [accessToken]);

    const sendMessage = () => {
        socketRef.current?.emit("message", {
            chatId: "chat123",
            text: "Привет!",
        });
    };

    return (
        <div className='container'>
            <h1>Чат</h1>
            <p>{connected ? "🟢 Подключено" : "🔴 Отключено"}</p>
            <button onClick={sendMessage}>Отправить сообщение</button>
            <input type='text' placeholder='Напиши сообщение' />
        </div>
    );
}