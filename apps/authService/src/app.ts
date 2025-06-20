import express from "express";
import morgan from "morgan";
import { logger } from "./shared/logger"
import authRouter from "./routers/authRouter";
import { settings } from "./shared/config";
import cors from "cors";


const app = express();

app.use(express.json());
app.use(cors());

app.use(`${settings.api_v1_prefix}/auth`, authRouter);

app.use(morgan("combined", {
    stream: {
        write: (message: string) => logger.info(message.trim()),
    }
}));

export default app;
