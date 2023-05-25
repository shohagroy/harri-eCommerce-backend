// const cloudinary = require("../configs/cloudinary");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRETE,
});

export default async (files: string) => {
  //   console.log(files);

  try {
    const result = await cloudinary.uploader.upload(files);

    console.log(result);
    return result.secure_url;
  } catch (error) {
    console.log(error);
    return "";
  }
};
