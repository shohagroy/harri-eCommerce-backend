import express from "express";
import verifiedLoginUser from "../../middlewares/verifyTokenUser";
import { wishListControllers } from "./wishList.controller";

const router = express.Router();

// wish lists route
router
  .route("/")
  .post(verifiedLoginUser, wishListControllers.postUserWishList)
  .get(verifiedLoginUser, wishListControllers.getAllUserWishLists);

export const wishListRouts = router;
