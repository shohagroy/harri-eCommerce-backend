import { RequestHandler } from "express";
import { getProductReviewToDb, postNewReviewToDb } from "./review.service";

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

export const getProductReviews: RequestHandler = async (req, res, next) => {
  const id = req.params.id;

  try {
    const response = await getProductReviewToDb(id);

    res.status(200).json({
      status: "success",
      message: "Product reviews received successfully!",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
