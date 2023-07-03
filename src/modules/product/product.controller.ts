import { Request, Response } from "express";
import { productServices } from "./product.service";
import catchAsync from "../../shared/catchAsync";

const postNewProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await productServices.createNewProductToDB(req.body);
  res.status(201).json({ status: "success", data: product });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const products = await productServices.getAllProductsToDB(query);

  res.status(200).json({
    status: "success",
    data: products.data,
    count: products.count,
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const query = req.params.id;
  const product = await productServices.getProductToDB(query);

  res.status(200).json({
    status: "success",
    data: product,
  });
});

const deleteProductById = catchAsync(async (req: Request, res: Response) => {
  const response = await productServices.deleteProductByIdToDB(req.params.id);

  if (response?.acknowledged) {
    res
      .status(200)
      .json({ status: "success", message: "Category Delete Successfully!" });
  }
});

const updateProductById = catchAsync(async (req: Request, res: Response) => {
  const response = await productServices.updateProductByIdToDB(req.body);

  if (response?._id) {
    res
      .status(200)
      .json({ status: "success", message: "Product updated Successfully!" });
  }
});

export const productControllers = {
  postNewProduct,
  getAllProducts,
  getSingleProduct,
  deleteProductById,
  updateProductById,
};
