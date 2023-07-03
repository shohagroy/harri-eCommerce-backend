import { SortOrder, Types } from "mongoose";
import deleteImage from "../../utils/deleteImage";
import uploadImages from "../../utils/uploadImages";
import Product, { IProduct, IProductFilters } from "./product.interface";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelpers } from "../../helpers/paginationHelper";
import { productFilterableFields } from "./product.constants";

const createNewProductToDB = async (data: IProduct) => {
  const images = await uploadImages(data.images);

  const response = await Product.create({ ...data, images: images });
  return response;
};

const getAllProductsToDB = async (
  query: any,
  filters: IProductFilters,
  paginationOptions: IPaginationOptions
) => {
  // const { search, sort, searchByCategory } = query;

  const { searchTerm, maxPrice, minPrice, sortBy, ...filtersData } = filters;

  const { page, limit, skip, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: productFilterableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (maxPrice) {
    andConditions.push({
      price: {
        $lte: maxPrice,
      },
    });
  }

  if (minPrice) {
    andConditions.push({
      price: {
        $gte: minPrice,
      },
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Product.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getProductToDB = async (query: string) => {
  const response = await Product.findById({ _id: query });
  return response;
};

const deleteProductByIdToDB = async (id: string) => {
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

const updateProductByIdToDB = async (data: any) => {
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

export const productServices = {
  createNewProductToDB,
  getAllProductsToDB,
  getProductToDB,
  deleteProductByIdToDB,
  updateProductByIdToDB,
};
