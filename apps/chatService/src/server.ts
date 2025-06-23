import mongoose from "mongoose";
import app from "./app";
import {settings} from "./core/config";


const start = async () => {
    try {
        await mongoose.connect(settings.db.url);

        app.listen(settings.port, () => {
            console.log(`🚀 Сервер слушает порт: ${settings.port}`);
        });
    } catch (error) {
        console.error(`❌ Ошибка запуска сервера: ${error}`);
    }
};


start();
