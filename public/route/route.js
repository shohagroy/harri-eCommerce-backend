"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../modules/category/category.controller");
const product_controller_1 = require("../modules/product/product.controller");
const router = express_1.default.Router();
// category route
router.route("/categorys").get(category_controller_1.getAllCategorys).post(category_controller_1.postNewCategory);
router
    .route("/categorys/:id")
    .delete(category_controller_1.deleteCategoryById)
    .put(category_controller_1.updateCategoryById);
// product routes
router.route("/products").post(product_controller_1.postNewProduct).get(product_controller_1.getAllProducts);
router
    .route("/products/:id")
    .post(product_controller_1.postNewProduct)
    .get(product_controller_1.getSingleProduct)
    .put(product_controller_1.updateProductById)
    .delete(product_controller_1.deleteProductById);
exports.default = router;
