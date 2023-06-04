import { Request, Response } from "express";
import { errorHandelar } from "../../utils/globalErrorHandelar";
import {
  createNewCategoryToDB,
  deleteCaregoryByIdToDB,
  getAllCategorysToDB,
  updateCaregoryByIdToDB,
} from "./category.service";

export const postNewCategory = async (req: Request, res: Response) => {
  try {
    const category = await createNewCategoryToDB(req.body);

    res.status(201).json({ status: "success", data: category });
  } catch (error) {
    errorHandelar(res, error);
  }
};

export const getAllCategorys = async (req: Request, res: Response) => {
  const query = req.query;

  try {
    const categorys = await getAllCategorysToDB(query);

    res.status(200).json({
      status: "success",
      data: categorys.data,
      count: categorys.count,
    });
  } catch (error) {
    console.log(error);
    errorHandelar(res, error);
  }
};

export const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    const response = await deleteCaregoryByIdToDB(req.params.id);

    // console.log(response);

    if (response?.acknowledged) {
      res
        .status(200)
        .json({ status: "success", message: "Category Delete Successfully!" });
    }
  } catch (error) {
    errorHandelar(res, error);
  }
};

export const updateCategoryById = async (req: Request, res: Response) => {
  try {
    const response = await updateCaregoryByIdToDB(req.body);
    if (response?._id) {
      res
        .status(200)
        .json({ status: "success", message: "Category updated Successfully!" });
    }
  } catch (error) {
    errorHandelar(res, error);
  }
};
