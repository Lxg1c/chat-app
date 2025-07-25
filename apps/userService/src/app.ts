import express from "express";
import morgan from "morgan"
import router from "./router/userRouter";
import {settings} from "./core/config";
import {logger} from "./core/logger";
import cors from 'cors'


const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    credentials: true,
}))

app.use(morgan("combined", {
    stream: {
        write: (message: string) => logger.info(message.trim()),
    }
}));

app.use(`${settings.api_v1_prefix}/user`, router)

export default app;