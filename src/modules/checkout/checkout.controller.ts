import { RequestHandler } from "express";
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
      const checkoutProduct = await getProductToDB(id);
      checkoutProduct?.quantity ? (checkoutProduct.quantity = 1) : null;

      response = [checkoutProduct];
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
