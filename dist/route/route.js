"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyTokenUser_1 = __importDefault(require("../middlewares/verifyTokenUser"));
const cartList_controller_1 = require("../modules/cartList/cartList.controller");
const category_controller_1 = require("../modules/category/category.controller");
const product_controller_1 = require("../modules/product/product.controller");
const user_controller_1 = require("../modules/user/user.controller");
const wishList_controller_1 = require("../modules/wishList/wishList.controller");
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
// user route
router.route("/create-user").post(user_controller_1.createNewUser);
router.route("/login-user").post(user_controller_1.userLogin);
router.route("/login/auth/google").get(user_controller_1.userLoginWithGoogle);
router.route("/get-login-user").get(verifyTokenUser_1.default, user_controller_1.findLoginUser);
router.route("/logout-user").post(user_controller_1.userLogout);
// wish lists route
router
    .route("/wish-lists")
    .post(verifyTokenUser_1.default, wishList_controller_1.postUserWishList)
    .get(verifyTokenUser_1.default, wishList_controller_1.getAllUserWishLists);
// cart lists route
router
    .route("/cart-lists")
    .post(verifyTokenUser_1.default, cartList_controller_1.postUserCartList)
    .get(verifyTokenUser_1.default, cartList_controller_1.getAllUserCartLists);
exports.default = router;
