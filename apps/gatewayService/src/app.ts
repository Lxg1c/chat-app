import express from "express";
import {createProxyMiddleware} from "http-proxy-middleware";
import {settings} from "./shared/config";
import {logger} from "./shared/logger";
import morgan from "morgan";
import {verifyAccessToken} from "./shared/lib/jwt";
import axios from "axios";
import cors from "cors";


const app = express();


app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(`${settings.api_v1_prefix}/register`, createProxyMiddleware({
    target: "http://localhost:5001/api/v1/auth/register",
    changeOrigin: true,
}));

app.use(`${settings.api_v1_prefix}/login`, createProxyMiddleware({
    target: "http://localhost:5001/api/v1/auth/login",
    changeOrigin: true,
}));

app.use(`${settings.api_v1_prefix}/refresh`, createProxyMiddleware({
    target: "http://localhost:5001/api/v1/auth/refresh",
    changeOrigin: true,
}));

app.use(`${settings.api_v1_prefix}/logout`, createProxyMiddleware({
    target: "http://localhost:5001/api/v1/auth/logout",
    changeOrigin: true,
}))


app.use(`${settings.api_v1_prefix}/about/:id`, createProxyMiddleware({
    target: "http://localhost:5002/api/v1/users",
    changeOrigin: true,
}))


class Service {
    async getUserId(token: string) {
        const verify = verifyAccessToken(token);
        return verify.id;
    }
}

const service = new Service();

class Controller {
    async getUserInfo(req: express.Request, res: express.Response): Promise<void> {
        try {
            const bearerToken = req.headers.authorization;
            const accessToken = bearerToken?.split(" ")[1];

            if (!accessToken) {
                res.status(401).json({ error: "Access token not provided" });
                return
            }

            const userId = await service.getUserId(accessToken);

            const response = await axios.get(`http://localhost:5002/api/v1/user/users/${userId}`);
            res.json(response.data);

        } catch (e) {
            console.error("❌ Ошибка при получении информации о пользователе", e);
            res.status(500).json({ error: "Failed to fetch user info" });
        }
    }
}

const controller = new Controller();

const router = express.Router();

router.get("/about", controller.getUserInfo);

app.use(settings.api_v1_prefix, router);

app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms", {
    stream: {
        write: (message) => logger.http(message.trim()),
    },
}));
export default app