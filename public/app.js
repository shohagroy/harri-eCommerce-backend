"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const route_1 = __importDefault(require("./route/route"));
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({
    origin: ["http://localhost:3000"],
    // origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
}));
app.use(body_parser_1.default.json({ limit: "20mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "20mb", extended: false }));
app.get("/", (req, res) => {
    res.send("harri shop server is running...");
});
app.use("/api/v1", route_1.default);
exports.default = app;
