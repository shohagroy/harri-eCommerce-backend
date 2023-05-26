import express from "express";
import {
  deleteCategoryById,
  getAllCategorys,
  postNewCategory,
} from "../modules/category/category.controller";

const router = express.Router();

router.route("/categorys").get(getAllCategorys).post(postNewCategory);
router.route("/categorys/:id").delete(deleteCategoryById);

export default router;
