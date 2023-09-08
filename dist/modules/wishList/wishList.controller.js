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
exports.wishListControllers = void 0;
const wishList_service_1 = require("./wishList.service");
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const postUserWishList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield wishList_service_1.wishListService.createUserWishListProductToDB(req.body, req.user);
    res.status(201).json({
        status: "success",
        message: response,
    });
}));
const getAllUserWishLists = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield wishList_service_1.wishListService.getAallUserWishListToDB(req === null || req === void 0 ? void 0 : req.user);
    res.status(201).json({
        status: "success",
        message: "user wish list get successfully!",
        data: response,
    });
}));
exports.wishListControllers = {
    postUserWishList,
    getAllUserWishLists,
};
