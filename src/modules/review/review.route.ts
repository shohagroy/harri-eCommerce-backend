import express from "express";
import verifiedLoginUser from "../../middlewares/verifyTokenUser";
import { reviewControllers } from "./review.controller";

const router = express.Router();

// user information route
router.route("/").post(verifiedLoginUser, reviewControllers.postProductReview);
router
  .route("/:id")
  .get(verifiedLoginUser, reviewControllers.getProductReviews);

export const reviewRouts = router;
