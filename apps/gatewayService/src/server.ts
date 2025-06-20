import {settings} from "./shared/config";
import {setupWebSocket} from "./ws";
import * as http from "http";
import app from "./app";


const start = async () => {
    try {
        const server = http.createServer(app);
        setupWebSocket(server);

        server.listen(settings.port, () => {
            console.log(`🚀 Сервер слушает порт: ${settings.port}`);
        });
    } catch (error) {
        console.error(`❌ Ошибка при запуске сервера: ${error}`);
    }
};



start();
