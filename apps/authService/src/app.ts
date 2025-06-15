import express from "express";
import morgan from "morgan";
import { logger } from "./core/logger"
import authRouter from "./routers/authRouter";
import { settings } from "./core/config";

const app = express();


app.use(morgan("combined", {
    stream: {
        write: (message: string) => logger.info(message.trim()),
    }
}));


app.use(express.json());
app.use(`${settings.api_v1_prefix}/auth`, authRouter);

export default app;
