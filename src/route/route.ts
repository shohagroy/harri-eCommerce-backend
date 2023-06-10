import express from "express";
import passport from "passport";
import googleConfig from "../configs/google.config";
import verifiedTokenUser from "../middlewares/verifyTokenUser";
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
  userLogin,
  userLoginWithGoogle,
} from "../modules/user/user.controller";

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

// user login function
// passportConfig(passport);
router.route("/login-user").post(userLogin);
router.route("/get-login-user").get(verifiedTokenUser, findLoginUser);

router.route("/login/auth/google").get(userLoginWithGoogle);

// router
//   .route("/auth/callback")
// .get(
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     // Successful authentication, redirect to protected route
//     res.redirect("/protected");
//   }
// );

// router.route("/auth/google").get(async (req, res) => {
//   console.log("function call");
//   // const { clientID, callbackURL } = googleConfig;

//   // const authenticationURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${callbackURL}&response_type=code&scope=email%20profile`;

//   // Set the appropriate CORS headers
//   // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   // res.header(
//   //   "Access-Control-Allow-Methods",
//   //   "GET, HEAD, PUT, PATCH, POST, DELETE"
//   // );
//   // res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   // res.header("Access-Control-Allow-Credentials", "true");

//   // res.redirect(301, authenticationURL);
// });

export default router;
