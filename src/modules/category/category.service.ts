import { Types } from "mongoose";
import deleteImage from "../../utils/deleteImage";
import uploadImages from "../../utils/uploadImages";
import Category, { ICategory } from "./category.interface";

export const createNewCategoryToDB = async (data: ICategory) => {
  const icon = await uploadImages(data.icon);

  const response = await Category.create({ ...data, icon: icon });
  return response;
};

export const getAllCategorysToDB = async () => {
  const response = await Category.find();
  return response;
};

export const deleteCaregoryByIdToDB = async (id: string) => {
  const result = await Category.aggregate([
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
      $unset: ["name", "publish", "__v", "_id"],
    },
  ]);
  if (result[0].icon[0].id) {
    await deleteImage(result[0].icon);
    const response = await Category.deleteOne({ _id: new Types.ObjectId(id) });
    return response;
  }
};
