import mongoose from "mongoose";
import app from "./app";
import { settings } from "./shared/config";
import {connectRabbitMQ} from "./shared/rabbitmq";


const start = async () => {
    try {
        await mongoose.connect(settings.db.url);
        await connectRabbitMQ()

        app.listen(settings.port, () => {
            console.log(`🚀 Сервер слушает порт: ${settings.port}`);
        });
    } catch (error) {
        console.error(`❌ Ошибка при запуске сервера: ${error}`);
    }
};


start();
