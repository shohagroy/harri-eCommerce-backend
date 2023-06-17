"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_config_1 = __importDefault(require("./env.config"));
const googleConfig = {
    clientID: env_config_1.default.GOOGGLE_CLIENT_ID,
    clientSecret: env_config_1.default.GOOGGLE_CLIENT_SECRET,
    callbackURL: env_config_1.default.GOOGGLE_CALL_BACK_URL,
};
exports.default = googleConfig;
