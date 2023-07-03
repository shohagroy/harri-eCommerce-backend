import express from "express";
import verifiedLoginUser from "../../middlewares/verifyTokenUser";
import { cartListControllers } from "./cartList.controller";

const router = express.Router();

router
  .route("/")
  .post(verifiedLoginUser, cartListControllers.postUserCartList)
  .get(verifiedLoginUser, cartListControllers.getAllUserCartLists)
  .patch(verifiedLoginUser, cartListControllers.updateCartQuantaty);

export const cartListRoutes = router;
