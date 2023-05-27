const cloudinary = require("cloudinary").v2;
const { config } = require("../configs/cloudinary");

export default async (images: [{ url: string; id: string }]) => {
  cloudinary.config(config);

  images.forEach((img) => {
    cloudinary.uploader.destroy(img.id);
  });
};
