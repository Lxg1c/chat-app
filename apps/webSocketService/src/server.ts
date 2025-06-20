import server from "./app";
import {settings} from "./shared/config";


const start = async () => {
    try {

        server.listen(settings.port, () => {
            console.log(`🚀 Сервер слушает порт: ${settings.port}`);
        });
    } catch (error) {
        console.error(`❌ Ошибка при запуске сервера: ${error}`);
    }
};


start();
