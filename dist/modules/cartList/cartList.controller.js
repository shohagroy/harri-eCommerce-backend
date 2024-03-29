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
exports.cartListControllers = void 0;
const cartList_service_1 = require("./cartList.service");
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const postUserCartList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield cartList_service_1.cartListService.createUserCartListProductToDB(req.body, req.user);
    res.status(201).json({
        status: "success",
        message: response,
    });
}));
const updateCartQuantaty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, quantity } = req.body;
    const response = yield cartList_service_1.cartListService.cartListProductQuentatyUpdated(_id, quantity);
    res.status(201).json({
        status: "success",
        message: response,
    });
}));
const getAllUserCartLists = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield cartList_service_1.cartListService.getAallUserCartListToDB(req === null || req === void 0 ? void 0 : req.user);
    res.status(201).json({
        status: "success",
        message: "user cart list get successfully!",
        data: response,
    });
}));
exports.cartListControllers = {
    postUserCartList,
    updateCartQuantaty,
    getAllUserCartLists,
};
