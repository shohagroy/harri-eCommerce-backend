import { Types } from "mongoose";
import { IProduct } from "../product/product.interface";
// import Category, { ICategory } from "./category.interface";

export const createUserWishListProductToDB = async (data: IProduct) => {
  //   const response = await Category.create({ ...data, icon: icon });
  return null;
};

// export const getAllCategorysToDB = async (query: any) => {
//   const { search, skip } = query;

//   const result = await Category.aggregate([
//     {
//       $facet: {
//         count: [
//           {
//             $group: {
//               _id: null,
//               count: { $sum: 1 },
//             },
//           },
//         ],
//         data: [
//           {
//             $match: { name: { $regex: search } },
//           },
//           {
//             $sort: { createdAt: -1 },
//           },
//           {
//             $skip: parseInt(skip),
//           },
//           {
//             $limit: 10,
//           },
//         ],
//       },
//     },
//     {
//       $project: {
//         count: { $arrayElemAt: ["$count.count", 0] },
//         data: 1,
//       },
//     },
//   ]);

//   return result[0];
// };

// export const deleteCaregoryByIdToDB = async (id: string) => {
//   const result = await Category.aggregate([
//     {
//       $match: {
//         _id: new Types.ObjectId(id),
//       },
//     },
//     {
//       $project: {
//         icon: 1,
//       },
//     },
//     {
//       $unset: ["name", "publish", "__v", "_id"],
//     },
//   ]);

//   if (result[0].icon[0].id) {
//     await deleteImage(result[0].icon);
//     const response = await Category.deleteOne({ _id: new Types.ObjectId(id) });
//     return response;
//   }
// };

// export const updateCaregoryByIdToDB = async (data: ICategory) => {
//   const { name, icon, publish, _id } = data;

//   if (icon.length > 1) {
//     const result = await Category.aggregate([
//       {
//         $match: {
//           _id: new Types.ObjectId(_id),
//         },
//       },
//       {
//         $project: {
//           icon: 1,
//         },
//       },
//       {
//         $unset: ["name", "publish", "__v", "_id"],
//       },
//     ]);

//     if (result[0].icon[0].id) {
//       await deleteImage(result[0].icon);
//     }

//     const updateIcon = await uploadImages(data.icon);
//     const updatedCategory = await Category.findByIdAndUpdate(
//       _id,
//       {
//         name: name,
//         icon: updateIcon,
//         publish: publish,
//       },
//       { new: true }
//     );
//     return updatedCategory;
//   } else {
//     const updatedCategory = await Category.findByIdAndUpdate(
//       _id,
//       {
//         name: name,
//         icon: icon,
//         publish: publish,
//       },
//       { new: true }
//     );

//     return updatedCategory;
//   }
// };
