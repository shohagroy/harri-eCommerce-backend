import { RequestHandler } from "express";
import { getCheckoutProductsToDb } from "./checkout.service";
import { getAallUserCartListToDB } from "../cartList/cartList.service";
import { getProductToDB } from "../product/product.service";

export const getAllCheckoutProducts: RequestHandler = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  let response;

  try {
    if (id === "allCart") {
      response = await getAallUserCartListToDB(req.user);
    } else {
      response = [await getProductToDB(id)];
    }

    res.status(200).json({
      status: "success",
      message: "checkout products received successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
