"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_config_1 = __importDefault(require("../configs/env.config"));
const jwt = require("jsonwebtoken");
const generateToken = (userInfo) => {
    const { firstName, role, email, _id } = userInfo;
    const payload = {
        firstName,
        role,
        email,
        _id,
    };
    const token = jwt.sign(payload, env_config_1.default.SECTECT_TOKEN_KEY, {
        expiresIn: "10H",
    });
    return token;
};
exports.default = generateToken;
