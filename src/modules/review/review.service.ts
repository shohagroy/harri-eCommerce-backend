import Review, { IReview } from "./review.interface";

const postNewReviewToDb = async (payload: IReview) => {
  const result = await Review.create(payload);

  if (result._id) {
    return "Review created successfully!";
  } else {
    return "Something went wrong!";
  }
};

const getProductReviewToDb = async (id: string) => {
  const result = await Review.find({ productId: id });
  return result;
};

export const reviewServices = {
  postNewReviewToDb,
  getProductReviewToDb,
};
