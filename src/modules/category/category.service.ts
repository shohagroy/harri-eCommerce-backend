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
