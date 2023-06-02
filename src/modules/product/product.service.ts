import { Types } from "mongoose";
import deleteImage from "../../utils/deleteImage";
import uploadImages from "../../utils/uploadImages";
import Product, { IProduct } from "./product.interface";

export const createNewProductToDB = async (data: IProduct) => {
  const images = await uploadImages(data.images);

  const response = await Product.create({ ...data, images: images });
  return response;
};

export const getAllProductsToDB = async (query: any) => {
  const { search, skip, sort, searchByCategory } = query;

  const result = await Product.aggregate([
    {
      $facet: {
        count: [
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
            },
          },
        ],
        data: [
          {
            $match: {
              $and: [
                searchByCategory
                  ? {
                      "category.id": new Types.ObjectId(searchByCategory),
                    }
                  : { title: { $regex: search } },
              ],
            },
          },
          {
            $sort: { price: sort === "high" ? -1 : 1 },
          },
          {
            $skip: parseInt(skip),
          },
          {
            $limit: 10,
          },
        ],
      },
    },
    {
      $project: {
        count: { $arrayElemAt: ["$count.count", 0] },
        data: 1,
      },
    },
  ]);

  return result[0];
};

export const getProductToDB = async (query: string) => {
  const response = await Product.findById({ _id: query });
  return response;
};

export const deleteProductByIdToDB = async (id: string) => {
  const result = await Product.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(id),
      },
    },
    {
      $project: {
        icon: 1,
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
  const response = await Product.deleteOne({ _id: new Types.ObjectId(id) });
  return response;
};

export const updateProductByIdToDB = async (data: any) => {
  const { images, _id } = data;
  if (images[0].url) {
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
