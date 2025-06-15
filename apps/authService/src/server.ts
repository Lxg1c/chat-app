import mongoose from "mongoose";
import app from "./app";
import { settings } from "./core/config";
import {connectRabbitMQ} from "../../../packages/rabbitmq/rabbitmq";


const start = async () => {
    try {
        await mongoose.connect(settings.db.url);
        await connectRabbitMQ()

        app.listen(settings.db.port, () => {
            console.log(`🚀 Server listening on port ${settings.db.port}`);
        });
    } catch (error) {
        console.error(`❌ Failed to start server: ${error}`);
    }
};


start();
