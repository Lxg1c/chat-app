import mongoose from "mongoose";
import app from "./app";
import {settings} from "./core/config";
import {startConsumer} from "./core/rabbitmq";


const start = async () => {
    try {
        await mongoose.connect(settings.db.url);
        await startConsumer()

        app.listen(settings.db.port, () => {
            console.log(`🚀 Сервер слушает порт: ${settings.db.port}`);
        });
    } catch (error) {
        console.error(`❌ Ошибка запуска сервера: ${error}`);
    }
};


start();
