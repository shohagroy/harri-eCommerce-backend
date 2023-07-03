import express from "express";
import { userControll } from "./user.controller";
import verifiedLoginUser from "../../middlewares/verifyTokenUser";

const router = express.Router();

// user route
router.route("/create-user").post(userControll.createNewUser);
router.route("/login-user").post(userControll.userLogin);
router.route("/login/auth/google").get(userControll.userLoginWithGoogle);
router
  .route("/get-login-user")
  .get(verifiedLoginUser, userControll.findLoginUser);
router.route("/logout-user").post(userControll.userLogout);

export const userRoutes = router;
