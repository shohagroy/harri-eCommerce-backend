import express from "express";
import { userRoutes } from "../modules/user/user.route";
import { cartListRoutes } from "../modules/cartList/cartList.route";
import { categoryRoutes } from "../modules/category/category.route";
import { checkoutRoutes } from "../modules/checkout/checkout.route";
import { productRoutes } from "../modules/product/product.route";
import { reviewRouts } from "../modules/review/review.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/cart-lists",
    route: cartListRoutes,
  },
  {
    path: "/categorys",
    route: categoryRoutes,
  },
  {
    path: "/checkout",
    route: checkoutRoutes,
  },
  {
    path: "/products",
    route: productRoutes,
  },
  {
    path: "/product-reviews",
    route: reviewRouts,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

// // wish lists route
// router
//   .route("/wish-lists")
//   .post(verifiedLoginUser, postUserWishList)
//   .get(verifiedLoginUser, getAllUserWishLists);

// // user information route
// router
//   .route("/users")
//   .patch(verifiedLoginUser, updateUserInfo)
//   .get(verifiedLoginUser, getAllUsers);

// router.route("/payment/success").post(paymentSuccess);
// router.route("/payment/fail").post(paymentFail);

export default router;
