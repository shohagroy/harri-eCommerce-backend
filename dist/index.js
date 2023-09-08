"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose = require("mongoose");
const env_config_1 = __importDefault(require("./configs/env.config"));
const loggar_1 = require("./shared/loggar");
const uri = process.env.NODE_ENV !== "production"
    ? "mongodb://127.0.0.1:27017/harri_shop"
    : env_config_1.default.DB_URI;
function dbConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (env_config_1.default.DB_URI) {
                yield mongoose.connect(uri);
                app_1.default.listen(env_config_1.default.PORT, () => {
                    console.log(`server is listening on port: ${env_config_1.default.PORT}`);
                });
            }
            else {
                console.error("db uri is not defined");
            }
        }
        catch (err) {
            loggar_1.errorLogger.error(`Failed to connect database ${err}`);
        }
    });
}
dbConnection();
