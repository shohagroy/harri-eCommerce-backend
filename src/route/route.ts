import express from "express";
import verifiedLoginUser from "../middlewares/verifyTokenUser";
import {
  getAllUserCartLists,
  postUserCartList,
  updateCartQuantaty,
} from "../modules/cartList/cartList.controller";
import {
  deleteCategoryById,
  getAllCategorys,
  postNewCategory,
  updateCategoryById,
} from "../modules/category/category.controller";

import {
  deleteProductById,
  getAllProducts,
  getSingleProduct,
  postNewProduct,
  updateProductById,
} from "../modules/product/product.controller";

import {
  createNewUser,
  findLoginUser,
  getAllUsers,
  updateUserInfo,
  userLogin,
  userLoginWithGoogle,
  userLogout,
} from "../modules/user/user.controller";

import {
  getAllUserWishLists,
  postUserWishList,
} from "../modules/wishList/wishList.controller";
import {
  getProductReviews,
  postProductReview,
} from "../modules/review/review.controller";
import {
  createNewCheckout,
  getAllCheckoutProducts,
  paymentFail,
  paymentSuccess,
} from "../modules/checkout/checkout.controller";

const router = express.Router();

// category route
router.route("/categorys").get(getAllCategorys).post(postNewCategory);
router
  .route("/categorys/:id")
  .delete(deleteCategoryById)
  .put(updateCategoryById);

// product routes
router.route("/products").post(postNewProduct).get(getAllProducts);
router
  .route("/products/:id")
  .post(postNewProduct)
  .get(getSingleProduct)
  .put(updateProductById)
  .delete(deleteProductById);

// user route
router.route("/create-user").post(createNewUser);
router.route("/login-user").post(userLogin);
router.route("/login/auth/google").get(userLoginWithGoogle);
router.route("/get-login-user").get(verifiedLoginUser, findLoginUser);
router.route("/logout-user").post(userLogout);

// wish lists route
router
  .route("/wish-lists")
  .post(verifiedLoginUser, postUserWishList)
  .get(verifiedLoginUser, getAllUserWishLists);

// cart lists route
router
  .route("/cart-lists")
  .post(verifiedLoginUser, postUserCartList)
  .get(verifiedLoginUser, getAllUserCartLists)
  .patch(verifiedLoginUser, updateCartQuantaty);

// user information route
router
  .route("/users")
  .patch(verifiedLoginUser, updateUserInfo)
  .get(verifiedLoginUser, getAllUsers);

// user information route
router.route("/product-reviews").post(verifiedLoginUser, postProductReview);
router.route("/product-reviews/:id").get(verifiedLoginUser, getProductReviews);

// user information route
router.route("/checkout").post(verifiedLoginUser, createNewCheckout);
router.route("/checkout/:id").get(verifiedLoginUser, getAllCheckoutProducts);

router.route("/payment/success").post(paymentSuccess);
router.route("/payment/fail").post(paymentFail);

export default router;
