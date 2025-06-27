import { createLogger, format, transports } from "winston";
import path from "path";

const { combine, timestamp, printf, colorize, errors } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
});

export const logger = createLogger({
    level: "debug",
    format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        logFormat
    ),
    transports: [
        new transports.Console({
            format: combine(colorize(), logFormat),
        }),
        new transports.File({
            filename: path.join("logs", "error.log"),
            level: "error",
        }),
        new transports.File({
            filename: path.join("logs", "combined.log"),
        }),
    ],
});
