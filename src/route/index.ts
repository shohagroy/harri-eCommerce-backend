import express from "express";
import { userRoutes } from "../modules/user/user.route";
import { cartListRoutes } from "../modules/cartList/cartList.route";
import { categoryRoutes } from "../modules/category/category.route";
import { checkoutRoutes } from "../modules/checkout/checkout.route";
import { productRoutes } from "../modules/product/product.route";
import { reviewRouts } from "../modules/review/review.route";
import { wishListRouts } from "../modules/wishList/wishList.route";

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
  {
    path: "/wish-lists",
    route: wishListRouts,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
