import { Request, Response } from "express";
import { reviewServices } from "./review.service";
import catchAsync from "../../shared/catchAsync";

const postProductReview = catchAsync(async (req: Request, res: Response) => {
  const response = await reviewServices.postNewReviewToDb(req.body);

  res.status(201).json({
    status: "success",
    message: response,
  });
});

const getProductReviews = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const response = await reviewServices.getProductReviewToDb(id);

  res.status(200).json({
    status: "success",
    message: "Product reviews received successfully!",
    data: response,
  });
});

export const reviewControllers = {
  postProductReview,
  getProductReviews,
};
