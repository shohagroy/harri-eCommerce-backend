import { Image } from "../modules/product/product.interface";

const cloudinary = require("cloudinary").v2;
const { config } = require("../configs/cloudinary");

export default async (images: Image[]) => {
  cloudinary.config(config);
  images.forEach((img) => {
    cloudinary.uploader.destroy(img.id);
  });
};
