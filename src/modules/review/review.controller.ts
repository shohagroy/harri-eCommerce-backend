import { RequestHandler } from "express";
import { postNewReviewToDb } from "./review.service";

export const postProductReview: RequestHandler = async (req, res, next) => {
  try {
    const response = await postNewReviewToDb(req.body);

    res.status(201).json({
      status: "success",
      message: response,
    });
  } catch (error) {
    next(error);
  }
};
