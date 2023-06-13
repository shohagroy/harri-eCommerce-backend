import { RequestHandler } from "express";
import { createUserWishListProductToDB } from "./wishList.service";

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
