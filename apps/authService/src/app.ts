import express from "express";
import morgan from "morgan";
import { logger } from "./shared/logger"
import authRouter from "./routers/authRouter";
import { settings } from "./shared/config";
import cors from "cors";
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms", {
    stream: {
        write: (message) => logger.http(message.trim()),
    },
}));

app.use(`${settings.api_v1_prefix}/auth`, authRouter);


export default app;
