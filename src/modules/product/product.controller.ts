import { Request, Response } from "express";
import { errorHandelar } from "../../utils/globalErrorHandelar";
import {
  createNewProductToDB,
  deleteProductByIdToDB,
  getAllProductsToDB,
  getProductToDB,
  updateProductByIdToDB,
} from "./product.service";

export const postNewProduct = async (req: Request, res: Response) => {
  try {
    const product = await createNewProductToDB(req.body);
    res.status(201).json({ status: "success", data: product });
  } catch (error) {
    errorHandelar(res, error);
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  const query = req.query;

  try {
    const products = await getAllProductsToDB(query);

    res.status(200).json({
      status: "success",
      data: products,
      //   count: products.count,
    });
  } catch (error) {
    console.log(error);
    errorHandelar(res, error);
  }
};

export const getSingleProduct = async (req: Request, res: Response) => {
  const query = req.params.id;

  try {
    const product = await getProductToDB(query);

    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    console.log(error);
    errorHandelar(res, error);
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const response = await deleteProductByIdToDB(req.params.id);

    console.log(response);

    if (response?.acknowledged) {
      res
        .status(200)
        .json({ status: "success", message: "Category Delete Successfully!" });
    }
  } catch (error) {
    errorHandelar(res, error);
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  try {
    const response = await updateProductByIdToDB(req.body);

    if (response?._id) {
      res
        .status(200)
        .json({ status: "success", message: "Product updated Successfully!" });
    }
  } catch (error) {
    console.log(error);
    errorHandelar(res, error);
  }
};
