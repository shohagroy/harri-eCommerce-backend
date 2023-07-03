import { RequestHandler } from "express";
import { getAallUserCartListToDB } from "../cartList/cartList.service";
import { getProductToDB } from "../product/product.service";
import { cheateNewCheckoutService } from "./checkout.service";
import CheckoutOrder from "./checkout.interface";
import envConfig from "../../configs/env.config";

const getAllCheckoutProducts: RequestHandler = async (req, res, next) => {
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

const createNewCheckout: RequestHandler = async (req, res, next) => {
  try {
    const response = await cheateNewCheckoutService(req.body);

    res.status(200).json({
      status: "success",
      message: "checkout payment url received successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const paymentSuccess: RequestHandler = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

const paymentFail: RequestHandler = async (req, res, next) => {
  try {
    const { tran_id } = req.query;

    const result = await CheckoutOrder.findByIdAndDelete(tran_id);

    const redirectUrl =
      envConfig.DEVELOPMENT === "production"
        ? `${envConfig.CLIENT_URL}?transaction_id=${result?._id}`
        : `http://localhost:3000/?transaction=failure`;

    if (result) {
      res.redirect(redirectUrl);
    }
  } catch (error) {
    next(error);
  }
};

export const checkoutControllers = {
  getAllCheckoutProducts,
  createNewCheckout,
  paymentSuccess,
  paymentFail,
};
