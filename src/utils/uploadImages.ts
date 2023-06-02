import { ICategory } from "../modules/category/category.interface";
import { IProduct } from "../modules/product/product.interface";

const cloudinary = require("cloudinary").v2;
const { config } = require("../configs/cloudinary");

export default async (data: []) => {
  cloudinary.config(config);

  const files = data;
  try {
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file);
        const image = { url: result.secure_url, id: result.public_id };
        return image;
      })
    );

    return uploadedFiles;
  } catch (error) {
    console.error(error);
    return [];
  }
};
