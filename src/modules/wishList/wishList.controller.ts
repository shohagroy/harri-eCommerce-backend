import { Request, Response } from "express";
import { wishListService } from "./wishList.service";
import catchAsync from "../../shared/catchAsync";

const postUserWishList = catchAsync(async (req: Request, res: Response) => {
  const response = await wishListService.createUserWishListProductToDB(
    req.body,
    req.user
  );

  res.status(201).json({
    status: "success",
    message: response,
  });
});

const getAllUserWishLists = catchAsync(async (req: Request, res: Response) => {
  const response = await wishListService.getAallUserWishListToDB(req?.user);

  res.status(201).json({
    status: "success",
    message: "user wish list get successfully!",
    data: response,
  });
});

export const wishListControllers = {
  postUserWishList,
  getAllUserWishLists,
};
