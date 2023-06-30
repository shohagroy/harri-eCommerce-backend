// import { Document, model, Model, Schema, Types } from "mongoose";

// export interface IReview extends Document {
//   rating: number;
//   reviewText: string;
//   userName: string;
//   userAvatar: string;
//   reviewDate: string;
//   productId: Types.ObjectId;
//   userId: Types.ObjectId;
// }

// const reviewSchema: Schema<IReview> = new Schema<IReview>(
//   {
//     rating: {
//       type: Number,
//       required: true,
//     },
//     reviewText: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     userName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     userAvatar: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     reviewDate: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     productId: {
//       type: Schema.Types.ObjectId,
//       ref: "Product",
//       required: true,
//     },
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Review: Model<IReview> = model<IReview>("Review", reviewSchema);

// export default Review;
