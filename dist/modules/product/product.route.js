"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const verifyTokenUser_1 = __importDefault(require("../../middlewares/verifyTokenUser"));
const product_controller_1 = require("./product.controller");
const authorization_1 = __importDefault(require("../../middlewares/authorization"));
const router = express_1.default.Router();
// product routes
router
    .route("/")
    .post(verifyTokenUser_1.default, (0, authorization_1.default)("admin"), product_controller_1.productControllers.postNewProduct)
    .get(product_controller_1.productControllers.getAllProducts);
router
    .route("/:id")
    .post(product_controller_1.productControllers.postNewProduct)
    .get(product_controller_1.productControllers.getSingleProduct)
    .put(product_controller_1.productControllers.updateProductById)
    .delete(product_controller_1.productControllers.deleteProductById);
exports.productRoutes = router;
