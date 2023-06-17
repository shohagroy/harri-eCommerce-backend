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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserCartLists = exports.postUserCartList = void 0;
const cartList_service_1 = require("./cartList.service");
const postUserCartList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, cartList_service_1.createUserCartListProductToDB)(req.body, req.user);
        res.status(201).json({
            status: "success",
            message: response,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.postUserCartList = postUserCartList;
const getAllUserCartLists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, cartList_service_1.getAallUserCartListToDB)(req === null || req === void 0 ? void 0 : req.user);
        res.status(201).json({
            status: "success",
            message: "user cart list get successfully!",
            data: response,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUserCartLists = getAllUserCartLists;
