"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const cartList_route_1 = require("../modules/cartList/cartList.route");
const category_route_1 = require("../modules/category/category.route");
const checkout_route_1 = require("../modules/checkout/checkout.route");
const product_route_1 = require("../modules/product/product.route");
const review_route_1 = require("../modules/review/review.route");
const wishList_route_1 = require("../modules/wishList/wishList.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/users",
        route: user_route_1.userRoutes,
    },
    {
        path: "/cart-lists",
        route: cartList_route_1.cartListRoutes,
    },
    {
        path: "/categorys",
        route: category_route_1.categoryRoutes,
    },
    {
        path: "/checkout",
        route: checkout_route_1.checkoutRoutes,
    },
    {
        path: "/products",
        route: product_route_1.productRoutes,
    },
    {
        path: "/product-reviews",
        route: review_route_1.reviewRouts,
    },
    {
        path: "/wish-lists",
        route: wishList_route_1.wishListRouts,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
