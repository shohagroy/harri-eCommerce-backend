import { RequestHandler } from "express";
import { createUserWishListProductToDB } from "./wishList.service";

export const postUserWishList: RequestHandler = async (req, res, next) => {
  try {
    const wishListProduct = await createUserWishListProductToDB(req.body);

    console.log(req.body);
    res.status(201).json({
      status: "success",
      message: "Category Create Successfully!",
      //   data: category,
    });
  } catch (error) {
    next(error);
  }
};
