import express from "express";
import verifiedLoginUser from "../../middlewares/verifyTokenUser";
import { checkoutControllers } from "./checkout.controller";

const router = express.Router();

// user checkout information route
router
  .route("/")
  .post(verifiedLoginUser, checkoutControllers.createNewCheckout);
router
  .route("/:id")
  .get(verifiedLoginUser, checkoutControllers.getAllCheckoutProducts);

export const checkoutRoutes = router;
