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
const env_config_1 = __importDefault(require("../configs/env.config"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const SSLCommerzPayment = require("sslcommerz-lts");
const paymentRedirectUrl = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, userName, phoneNumber, email, address, city, state, zip, product, totalPrice, } = payload || {};
    const store_id = env_config_1.default.SLL_STORE_ID;
    const store_passwd = env_config_1.default.SLL_STORE_PASSWORD;
    const is_live = env_config_1.default.DEVELOPMENT === "development" ? false : true;
    const data = {
        total_amount: totalPrice,
        currency: "BDT",
        tran_id: _id.toString(),
        success_url: env_config_1.default.DEVELOPMENT === "production"
            ? `${env_config_1.default.SERVER_URL}/api/v1/checkout/payment/success?tran_id=${_id}`
            : `http://localhost:5000/api/v1/checkout/payment/success?tran_id=${_id}`,
        fail_url: env_config_1.default.DEVELOPMENT === "production"
            ? `${env_config_1.default.SERVER_URL}/api/v1/checkout/payment/fail?tran_id=${_id}`
            : `http://localhost:5000/api/v1/checkout/payment/fail?tran_id=${_id}`,
        cancel_url: env_config_1.default.DEVELOPMENT === "production"
            ? `${env_config_1.default.SERVER_URL}/api/v1/checkout/payment/fail?tran_id=${_id}`
            : `http://localhost:5000/api/v1/checkout/payment/fail?tran_id=${_id}`,
        ipn_url: "/",
        shipping_method: "Courier",
        product_name: product,
        product_category: "general",
        product_profile: "general",
        cus_name: userName,
        cus_email: email,
        cus_add1: address,
        cus_add2: "",
        cus_city: city,
        cus_state: state,
        cus_postcode: zip,
        cus_country: "Bangladesh",
        cus_phone: phoneNumber,
        cus_fax: "",
        ship_name: userName,
        ship_add1: address,
        ship_add2: "",
        ship_city: city,
        ship_state: state,
        ship_postcode: zip,
        ship_country: "Bangladesh",
    };
    try {
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        const apiResponse = yield sslcz.init(data);
        // Redirect the user to payment gateway
        const GatewayPageURL = apiResponse.GatewayPageURL;
        return GatewayPageURL;
    }
    catch (error) {
        console.log(error);
        throw new ApiError_1.default(400, "SSLCommerz Payment Initialization Error");
    }
});
exports.default = paymentRedirectUrl;
