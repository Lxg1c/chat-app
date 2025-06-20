import { createProxyMiddleware } from "http-proxy-middleware";
import { Router } from "express";

const router = Router();
const target = "http://localhost:5003/api/v1/auth";

router.use("/register", createProxyMiddleware({ target: `${target}/register`, changeOrigin: true }));
router.use("/login", createProxyMiddleware({ target: `${target}/login`, changeOrigin: true }));
router.use("/refresh", createProxyMiddleware({ target: `${target}/refresh`, changeOrigin: true }));

export default router;
