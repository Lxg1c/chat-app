import express from "express";
import {createProxyMiddleware} from "http-proxy-middleware";
import {settings} from "./shared/config";


const app = express();

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

app.use(`${settings.api_v1_prefix}/about`, createProxyMiddleware({
    target: "http://localhost:5002/api/v1/user/users",
    changeOrigin: true,
}))

app.use(express.json());


export default app