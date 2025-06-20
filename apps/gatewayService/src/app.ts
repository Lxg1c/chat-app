import cors from "cors";
import express from "express";
import authProxy from "./proxy/authProxy";

const app = express();


// http routes
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(authProxy)


export default app