import express from "express";
import {
  getAllCategorys,
  postNewCategory,
} from "../modules/category/category.controller";

const router = express.Router();

router.route("/categorys").get(getAllCategorys).post(postNewCategory);

export default router;
