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
exports.checkoutControllers = void 0;
const checkout_interface_1 = __importDefault(require("./checkout.interface"));
const env_config_1 = __importDefault(require("../../configs/env.config"));
const cartList_service_1 = require("../cartList/cartList.service");
const checkout_service_1 = require("./checkout.service");
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const product_service_1 = require("../product/product.service");
const getAllCheckoutProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let response;
    if (id === "allCart") {
        response = yield cartList_service_1.cartListService.getAallUserCartListToDB(req.user);
    }
    else {
        const checkoutProduct = yield product_service_1.productServices.getProductToDB(id);
        (checkoutProduct === null || checkoutProduct === void 0 ? void 0 : checkoutProduct.quantity) ? (checkoutProduct.quantity = 1) : null;
        response = [checkoutProduct];
    }
    res.status(200).json({
        status: "success",
        message: "checkout products received successfully",
        data: response,
    });
}));
const createNewCheckout = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield checkout_service_1.checkoutService.cheateNewCheckoutService(req.body);
    res.status(200).json({
        status: "success",
        message: "checkout payment url received successfully",
        data: response,
    });
}));
const paymentSuccess = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tran_id } = req.query;
    const updatedData = {
        paymentMethod: "SLLCOMMERCE",
        status: true,
    };
    const result = yield checkout_interface_1.default.findByIdAndUpdate({ _id: tran_id }, updatedData, {
        new: true,
    });
    const redirectUrl = env_config_1.default.DEVELOPMENT === "production"
        ? `${env_config_1.default.CLIENT_URL}?transaction_id=${result === null || result === void 0 ? void 0 : result._id}`
        : `http://localhost:3000/?transaction_id=${result === null || result === void 0 ? void 0 : result._id}`;
    if (result) {
        res.redirect(redirectUrl);
    }
}));
const paymentFail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tran_id } = req.query;
    const result = yield checkout_interface_1.default.findByIdAndDelete(tran_id);
    const redirectUrl = env_config_1.default.DEVELOPMENT === "production"
        ? `${env_config_1.default.CLIENT_URL}?transaction_id=${result === null || result === void 0 ? void 0 : result._id}`
        : `http://localhost:3000/?transaction=failure`;
    if (result) {
        res.redirect(redirectUrl);
    }
}));
exports.checkoutControllers = {
    getAllCheckoutProducts,
    createNewCheckout,
    paymentSuccess,
    paymentFail,
};
