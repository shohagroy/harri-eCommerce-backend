import { cartListService } from "./cartList.service";
import catchAsync from "../../shared/catchAsync";
import { Request, Response } from "express";

const postUserCartList = catchAsync(async (req: Request, res: Response) => {
  const response = await cartListService.createUserCartListProductToDB(
    req.body,
    req.user
  );

  res.status(201).json({
    status: "success",
    message: response,
  });
});

const updateCartQuantaty = catchAsync(async (req: Request, res: Response) => {
  const { _id, quantity } = req.body;
  const response = await cartListService.cartListProductQuentatyUpdated(
    _id,
    quantity
  );

  res.status(201).json({
    status: "success",
    message: response,
  });
});

const getAllUserCartLists = catchAsync(async (req: Request, res: Response) => {
  const response = await cartListService.getAallUserCartListToDB(req?.user);

  res.status(201).json({
    status: "success",
    message: "user cart list get successfully!",
    data: response,
  });
});

export const cartListControllers = {
  postUserCartList,
  updateCartQuantaty,
  getAllUserCartLists,
};
