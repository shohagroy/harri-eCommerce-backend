import { Types } from "mongoose";
import deleteImage from "../../utils/deleteImage";
import uploadImages from "../../utils/uploadImages";
import Product, { IProduct } from "./product.interface";

export const createNewProductToDB = async (data: IProduct) => {
  const images = await uploadImages(data);

  const response = await Product.create({ ...data, images: images });
  return response;
};

export const getAllProductsToDB = async (query: any) => {
  const { search, skip } = query;

  const response = await Product.find({});
  return response;

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
};

export const getProductToDB = async (query: string) => {
  const response = await Product.findById({ _id: query });
  return response;
};

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

export const updateProductByIdToDB = async (data: IProduct) => {
  const { images, _id } = data;
  if (images[0].url) {
    console.log(_id);
    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      { ...data },
      { new: true }
    );
    return updatedProduct;
  } else {
    const result = await Product.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(_id),
        },
      },
      {
        $project: {
          images: 1,
        },
      },
      {
        $unset: [
          "title",
          "category",
          "__v",
          "_id",
          "unit",
          "quantity",
          "price",
          "discount",
          "tags",
          "description",
          "publish",
        ],
      },
    ]);

    await deleteImage(result[0]);

    const updatedImages = await uploadImages(data);
    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      { ...data, images: updatedImages },
      { new: true }
    );

    return updatedProduct;
  }
};
