import { Request, Response } from "express";
import CheckoutOrder from "./checkout.interface";
import envConfig from "../../configs/env.config";
import { cartListService } from "../cartList/cartList.service";
import { checkoutService } from "./checkout.service";
import catchAsync from "../../shared/catchAsync";
import { productServices } from "../product/product.service";

const getAllCheckoutProducts = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    let response;

    if (id === "allCart") {
      response = await cartListService.getAallUserCartListToDB(req.user);
    } else {
      const checkoutProduct = await productServices.getProductToDB(id);
      checkoutProduct?.quantity ? (checkoutProduct.quantity = 1) : null;

      response = [checkoutProduct];
    }

    res.status(200).json({
      status: "success",
      message: "checkout products received successfully",
      data: response,
    });
  }
);

const createNewCheckout = catchAsync(async (req: Request, res: Response) => {
  const response = await checkoutService.cheateNewCheckoutService(req.body);

  res.status(200).json({
    status: "success",
    message: "checkout payment url received successfully",
    data: response,
  });
});

const paymentSuccess = catchAsync(async (req: Request, res: Response) => {
  const { tran_id } = req.query;

  const updatedData = {
    paymentMethod: "SLLCOMMERCE",
    status: true,
  };
  const result = await CheckoutOrder.findByIdAndUpdate(
    { _id: tran_id },
    updatedData,
    {
      new: true,
    }
  );

  const redirectUrl =
    envConfig.DEVELOPMENT === "production"
      ? `${envConfig.CLIENT_URL}?transaction_id=${result?._id}`
      : `http://localhost:3000/?transaction_id=${result?._id}`;

  if (result) {
    res.redirect(redirectUrl);
  }
});

const paymentFail = catchAsync(async (req: Request, res: Response) => {
  const { tran_id } = req.query;

  const result = await CheckoutOrder.findByIdAndDelete(tran_id);

  const redirectUrl =
    envConfig.DEVELOPMENT === "production"
      ? `${envConfig.CLIENT_URL}?transaction_id=${result?._id}`
      : `http://localhost:3000/?transaction=failure`;

  if (result) {
    res.redirect(redirectUrl);
  }
});

export const checkoutControllers = {
  getAllCheckoutProducts,
  createNewCheckout,
  paymentSuccess,
  paymentFail,
};
