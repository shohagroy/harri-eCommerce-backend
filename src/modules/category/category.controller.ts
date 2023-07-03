import { Request, Response } from "express";
import { categoryServices } from "./category.service";
import catchAsync from "../../shared/catchAsync";

const postNewCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await categoryServices.createNewCategoryToDB(req.body);
  res.status(201).json({
    status: "success",
    message: "Category Create Successfully!",
    data: category,
  });
});

const getAllCategorys = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const categorys = await categoryServices.getAllCategorysToDB(query);

  res.status(200).json({
    status: "success",
    message: "Get all Category Successfully!",
    data: categorys,
  });
});

const deleteCategoryById = catchAsync(async (req: Request, res: Response) => {
  const response = await categoryServices.deleteCaregoryByIdToDB(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Category Delete Successfully!",
    data: response,
  });
});

const updateCategoryById = catchAsync(async (req: Request, res: Response) => {
  const response = await categoryServices.updateCaregoryByIdToDB(req.body);

  if (response?._id) {
    res.status(200).json({
      status: "success",
      message: "Category Update Successfully!",
    });
  }
});

export const categoryControllers = {
  postNewCategory,
  getAllCategorys,
  deleteCategoryById,
  updateCategoryById,
};
