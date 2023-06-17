"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.logger = void 0;
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const path_1 = __importDefault(require("path"));
const { combine, timestamp, label, printf } = winston_1.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const secend = date.getSeconds();
    return `${date.toDateString()} ${hour}: ${minute}: ${secend} [${label}] ${level}: ${message}`;
});
exports.logger = (0, winston_1.createLogger)({
    level: "info",
    format: combine(label({ label: "harriShop!" }), timestamp(), myFormat),
    transports: [
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), "logs", "success", "dynamic-%DATE%-success.log"),
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: true,
            maxSize: "10m",
            maxFiles: "14d",
        }),
    ],
});
if (process.env.NODE_ENV !== "production") {
    exports.logger.add(new winston_1.transports.Console({
        format: winston_1.format.simple(),
    }));
}
exports.errorLogger = (0, winston_1.createLogger)({
    level: "error",
    format: combine(label({ label: "harriShop!" }), timestamp(), myFormat),
    transports: [
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), "logs", "errors", "dynamic-%DATE%-error.log"),
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
        }),
    ],
});
if (process.env.NODE_ENV !== "production") {
    exports.errorLogger.add(new winston_1.transports.Console({
        format: winston_1.format.simple(),
    }));
}
