"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishListRouts = void 0;
const express_1 = __importDefault(require("express"));
const verifyTokenUser_1 = __importDefault(require("../../middlewares/verifyTokenUser"));
const wishList_controller_1 = require("./wishList.controller");
const router = express_1.default.Router();
// wish lists route
router
    .route("/")
    .post(verifyTokenUser_1.default, wishList_controller_1.wishListControllers.postUserWishList)
    .get(verifyTokenUser_1.default, wishList_controller_1.wishListControllers.getAllUserWishLists);
exports.wishListRouts = router;
