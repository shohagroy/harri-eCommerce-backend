import { RequestHandler } from "express";
import {
  createNewCategoryToDB,
  deleteCaregoryByIdToDB,
  getAllCategorysToDB,
  updateCaregoryByIdToDB,
} from "./category.service";

const postNewCategory: RequestHandler = async (req, res, next) => {
  try {
    const category = await createNewCategoryToDB(req.body);

    res.status(201).json({
      status: "success",
      message: "Category Create Successfully!",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCategorys: RequestHandler = async (req, res, next) => {
  const query = req.query;

  try {
    const categorys = await getAllCategorysToDB(query);

    res.status(200).json({
      status: "success",
      message: "Get all Category Successfully!",
      data: categorys,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategoryById: RequestHandler = async (req, res, next) => {
  try {
    const response = await deleteCaregoryByIdToDB(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Category Delete Successfully!",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategoryById: RequestHandler = async (req, res, next) => {
  try {
    const response = await updateCaregoryByIdToDB(req.body);

    if (response?._id) {
      res.status(200).json({
        status: "success",
        message: "Category Update Successfully!",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const categoryControllers = {
  postNewCategory,
  getAllCategorys,
  deleteCategoryById,
  updateCategoryById,
};
