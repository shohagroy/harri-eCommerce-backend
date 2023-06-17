"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandelar = void 0;
const errorHandelar = (res, error) => {
    res.status(500).json({
        message: "Something went wrong",
        error,
    });
};
exports.errorHandelar = errorHandelar;
