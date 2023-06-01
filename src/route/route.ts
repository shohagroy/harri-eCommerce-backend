import express from "express";
import {
  deleteCategoryById,
  getAllCategorys,
  postNewCategory,
  updateCategoryById,
} from "../modules/category/category.controller";
import {
  getAllProducts,
  getSingleProduct,
  postNewProduct,
  updateProductById,
} from "../modules/product/product.controller";

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
  .put(updateProductById);

export default router;
