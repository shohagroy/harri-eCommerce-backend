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
exports.getAllUserWishLists = exports.postUserWishList = void 0;
const wishList_service_1 = require("./wishList.service");
const postUserWishList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, wishList_service_1.createUserWishListProductToDB)(req.body, req.user);
        res.status(201).json({
            status: "success",
            message: response,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.postUserWishList = postUserWishList;
const getAllUserWishLists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, wishList_service_1.getAallUserWishListToDB)(req === null || req === void 0 ? void 0 : req.user);
        res.status(201).json({
            status: "success",
            message: "user wish list get successfully!",
            data: response,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUserWishLists = getAllUserWishLists;
