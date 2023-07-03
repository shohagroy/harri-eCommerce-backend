import { Request, Response } from "express";
import { productServices } from "./product.service";
import catchAsync from "../../shared/catchAsync";
import pick from "../../shared/pick";
import { productFilterableFields } from "./product.constants";
import { paginationFields } from "../../constants/pagination";
import sendResponse from "../../shared/sendResponse";
import { IProduct } from "./product.interface";

const postNewProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await productServices.createNewProductToDB(req.body);
  res.status(201).json({ status: "success", data: product });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, productFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const query = req.query;
  const response = await productServices.getAllProductsToDB(
    query,
    filters,
    paginationOptions
  );

  sendResponse<IProduct[]>(res, {
    statusCode: 200,
    success: true,
    message: "Products received successfully!",
    meta: response.meta,
    data: response.data,
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
