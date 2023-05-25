import uploadImages from "../../utils/uploadImages";
import Category, { ICategory } from "./category.interface";

// // _________ans to the task number 2 ________________
// export const getBookByGrnre = async (): Promise<IBook[]> => {
//   const response = await Category.aggregate([{ $match: { genre: "Fantasy" } }]);
//   return response;
// };

export const createNewCategoryToDB = async (data: ICategory) => {
  const icon = await uploadImages(data.icon);

  console.log(icon);

  // console.log(icon);
  // const response = await Category.create({ ...data, icon });
  // console.log(response);
  // return response;
};
