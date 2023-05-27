import { Request, Response } from "express";
import { errorHandelar } from "../../utils/globalErrorHandelar";
import {
  createNewCategoryToDB,
  deleteCaregoryByIdToDB,
  getAllCategorysToDB,
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
  try {
    const categorys = await getAllCategorysToDB();
    res.status(200).json({ status: "success", data: categorys });
  } catch (error) {
    errorHandelar(res, error);
  }
};

export const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    const response = await deleteCaregoryByIdToDB(req.params.id);

    if (response?.acknowledged) {
      res
        .status(200)
        .json({ status: "success", message: "Category Delete Successfully!" });
    }
  } catch (error) {
    errorHandelar(res, error);
  }
};
