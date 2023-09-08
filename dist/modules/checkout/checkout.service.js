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
exports.checkoutService = void 0;
const sslcommerz_1 = __importDefault(require("../../utils/sslcommerz"));
const product_interface_1 = __importDefault(require("../product/product.interface"));
const checkout_interface_1 = __importDefault(require("./checkout.interface"));
const cheateNewCheckoutService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { productInfo, userInfo, productId } = payload;
    const checkoutProduct = yield product_interface_1.default.find({ _id: productId });
    const orderInfo = {
        userName: `${userInfo.firstName} ${userInfo.lastName}`,
        userId: userInfo._id,
        phoneNumber: userInfo.phone,
        email: userInfo.email,
        address: userInfo.address,
        city: userInfo.city,
        state: userInfo.state,
        zip: userInfo.zip,
        product: checkoutProduct.length ? (_a = checkoutProduct[0]) === null || _a === void 0 ? void 0 : _a.title : "comboPack",
        quantity: checkoutProduct.length ? 1 : "comboSize",
        price: checkoutProduct.length ? (_b = checkoutProduct[0]) === null || _b === void 0 ? void 0 : _b.price : "comboPrice",
        discount: productInfo.discount,
        shippingCharge: 20,
        totalPrice: productInfo.totalPrice,
        paymentMethod: "",
        delivary: "panding",
        status: false,
    };
    const newOrder = yield checkout_interface_1.default.create(orderInfo);
    if (newOrder._id) {
        const paymentUrl = yield (0, sslcommerz_1.default)(newOrder);
        return paymentUrl;
    }
});
exports.checkoutService = {
    cheateNewCheckoutService,
};
