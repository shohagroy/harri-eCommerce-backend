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
const body_parser_1 = __importDefault(require("body-parser"));
const globalErrorHandelar_1 = __importDefault(require("./middlewares/globalErrorHandelar"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const route_1 = __importDefault(require("./route/route"));
const passport_1 = __importDefault(require("passport"));
const passport_config_1 = __importDefault(require("./configs/passport.config"));
const express_session_1 = __importDefault(require("express-session"));
const generateToken_1 = __importDefault(require("./utils/generateToken"));
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({
    // origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json({ limit: "20mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "20mb", extended: false }));
app.use((0, express_session_1.default)({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // Session expiration time (in milliseconds)
    },
}));
app.get("/", (req, res) => {
    res.send("harri shop server is running...");
});
app.use("/api/v1", route_1.default);
app.use(globalErrorHandelar_1.default);
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, passport_config_1.default)(passport_1.default);
app.get("/auth/google", passport_1.default.authenticate("google", { scope: ["profile"] }));
app.get("/auth/callback", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate("google", (error, user) => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield (0, generateToken_1.default)(user);
        res.setHeader("Set-Cookie", `harriShop=${token}; Path=/;`);
        res.redirect("http://localhost:3000");
    }))(req, res, next);
}));
exports.default = app;
