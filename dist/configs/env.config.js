"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    DEVELOPMENT: process.env.DEVELOPMENT,
    DB_URI: process.env.DB_URI,
    PORT: process.env.PORT,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRETE: process.env.CLOUDINARY_API_SECRETE,
    SECTECT_TOKEN_KEY: process.env.SECTECT_TOKEN_KEY,
    GOOGGLE_CLIENT_ID: process.env.GOOGGLE_clientID,
    GOOGGLE_CLIENT_SECRET: process.env.GOOGGLE_clientSecret,
    GOOGGLE_CALL_BACK_URL: process.env.GOOGGLE_callbackURL,
    SLL_STORE_ID: process.env.STORE_ID,
    SLL_STORE_PASSWORD: process.env.STORE_PASSWORD,
    SERVER_URL: process.env.SERVER_URL,
    CLIENT_URL: process.env.CLIENT_URL,
};
