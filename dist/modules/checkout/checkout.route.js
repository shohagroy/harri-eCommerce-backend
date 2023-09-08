"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutRoutes = void 0;
const express_1 = __importDefault(require("express"));
const verifyTokenUser_1 = __importDefault(require("../../middlewares/verifyTokenUser"));
const checkout_controller_1 = require("./checkout.controller");
const router = express_1.default.Router();
// user checkout information route
router
    .route("/")
    .post(verifyTokenUser_1.default, checkout_controller_1.checkoutControllers.createNewCheckout);
router
    .route("/:id")
    .get(verifyTokenUser_1.default, checkout_controller_1.checkoutControllers.getAllCheckoutProducts);
router.route("/payment/success").post(checkout_controller_1.checkoutControllers.paymentSuccess);
router.route("/payment/fail").post(checkout_controller_1.checkoutControllers.paymentFail);
exports.checkoutRoutes = router;
