import Review, { IReview } from "./review.interface";

export const postNewReviewToDb = async (payload: IReview) => {
  const result = await Review.create(payload);

  if (result._id) {
    return "Review created successfully!";
  } else {
    return "Something went wrong!";
  }
};

export const getProductReviewToDb = async (id: string) => {
  const result = await Review.find({ productId: id });
  return result;
};
