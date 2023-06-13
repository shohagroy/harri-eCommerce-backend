import { RequestHandler } from "express";
import {
  createUserCartListProductToDB,
  getAallUserCartListToDB,
} from "./cartList.service";

export const postUserCartList: RequestHandler = async (req, res, next) => {
  try {
    const response = await createUserCartListProductToDB(req.body, req.user);

    res.status(201).json({
      status: "success",
      message: response,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUserCartLists: RequestHandler = async (req, res, next) => {
  try {
    const response = await getAallUserCartListToDB(req?.user);

    res.status(201).json({
      status: "success",
      message: "user cart list get successfully!",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
