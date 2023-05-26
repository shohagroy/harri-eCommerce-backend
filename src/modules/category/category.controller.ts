import { Request, Response } from "express";
import { errorHandelar } from "../../utils/globalErrorHandelar";
import { createNewCategoryToDB, getAllCategorysToDB } from "./category.service";

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

    console.log(categorys);
    res.status(200).json({ status: "success", data: categorys });
  } catch (error) {
    res.status(500).json({ status: "fail", error });
  }
};
