import { Router } from "express";
import { body } from "express-validator";
import { authController } from "../controllers/authController";


const authRouter = Router();


authRouter.post(
    "/register",
    body("username")
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3, max: 20 }).withMessage("Username must be 3-20 characters"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6, max: 20 }).withMessage("Password must be 6-20 characters"),
    authController.registration
);

authRouter.post(
    "/login",
    body("username")
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3, max: 20 }).withMessage("Username must be 3-20 characters"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6, max: 20 }).withMessage("Password must be 6-20 characters"),
    authController.login
);

authRouter.post(
    '/refresh',
    authController.refreshToken
)

authRouter.post(
    "/logout",
    authController.logout
)


export default authRouter;
