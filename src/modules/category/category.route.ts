import express from "express";
import { categoryControllers } from "./category.controller";

const router = express.Router();

// category route
router
  .route("/")
  .get(categoryControllers.getAllCategorys)
  .post(categoryControllers.postNewCategory);
router
  .route("/:id")
  .delete(categoryControllers.deleteCategoryById)
  .put(categoryControllers.updateCategoryById);

export const categoryRoutes = router;
