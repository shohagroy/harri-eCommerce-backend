// const cloudinary = require("../configs/cloudinary");

const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRETE,
// });

cloudinary.config({
  cloud_name: "djx9awdb7",
  api_key: "527518436833723",
  api_secret: "ahoHDi8qaKK-rDn8Bzg4Pn8bg1g",
});

export default async (files: string) => {
  try {
    const result = await cloudinary.uploader.upload(files);
    return result.secure_url;
  } catch (error) {
    console.error(error);
    return "";
  }
};
