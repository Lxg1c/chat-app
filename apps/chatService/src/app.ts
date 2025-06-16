import express from "express";
import morgan from "morgan"
import {logger} from "./utils/logger";
import router from "./router/chat.router";
import {settings} from "./core/config";

const app = express();

app.use(express.json());
app.use(`${settings.api_v1_prefix}/chat`, router);

app.use(morgan("combined", {
    stream: {
        write: (message: string) => logger.info(message.trim()),
    }
}));


export default app;