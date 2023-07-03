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
router.route("/payment/success").post(checkoutControllers.paymentSuccess);
router.route("/payment/fail").post(checkoutControllers.paymentFail);

export const checkoutRoutes = router;
