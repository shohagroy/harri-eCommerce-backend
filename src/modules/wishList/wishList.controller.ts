import { RequestHandler } from "express";
import {
  createUserWishListProductToDB,
  getAallUserWishListToDB,
} from "./wishList.service";

export const postUserWishList: RequestHandler = async (req, res, next) => {
  try {
    const response = await createUserWishListProductToDB(req.body, req.user);

    res.status(201).json({
      status: "success",
      message: response,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUserWishLists: RequestHandler = async (req, res, next) => {
  try {
    const response = await getAallUserWishListToDB(req?.user);

    res.status(201).json({
      status: "success",
      message: "user wish list get successfully!",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
