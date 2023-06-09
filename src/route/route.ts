import express from "express";
import passport from "passport";
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

export default router;
