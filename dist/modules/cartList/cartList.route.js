"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartListRoutes = void 0;
const express_1 = __importDefault(require("express"));
const verifyTokenUser_1 = __importDefault(require("../../middlewares/verifyTokenUser"));
const cartList_controller_1 = require("./cartList.controller");
const router = express_1.default.Router();
router
    .route("/")
    .post(verifyTokenUser_1.default, cartList_controller_1.cartListControllers.postUserCartList)
    .get(verifyTokenUser_1.default, cartList_controller_1.cartListControllers.getAllUserCartLists)
    .patch(verifyTokenUser_1.default, cartList_controller_1.cartListControllers.updateCartQuantaty);
exports.cartListRoutes = router;
