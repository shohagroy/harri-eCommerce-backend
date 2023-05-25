import { Request, Response } from "express";
import { createNewCategoryToDB } from "./category.service";

export const postNewCategory = async (req: Request, res: Response) => {
  try {
    const category = await createNewCategoryToDB(req.body);
    res.status(201).json({ status: "success", data: category });
  } catch (error) {
    res.status(500).json({ status: "fail", error });
  }
};

export const getAllCategorys = async (req: Request, res: Response) => {
  console.log("call");

  res.send("get all categories");
  //   const category = await createNewCategoryToDB(req.body);
  //   try {
  //     res.status(201).json({ status: "success", data: category });
  //   } catch (error) {
  //     res.status(500).json({ status: "fail", error });
  //   }
};
