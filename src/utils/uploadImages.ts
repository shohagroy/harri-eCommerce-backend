const cloudinary = require("cloudinary").v2;
const { config } = require("../configs/cloudinary");

export default async (files: any) => {
  cloudinary.config(config);

  const uploadedFiles = [];
  try {
    const result = await cloudinary.uploader.upload(files);
    const image = { url: result.secure_url, id: result.public_id };
    uploadedFiles.push(image);

    return uploadedFiles;
  } catch (error) {
    console.error(error);
    return uploadedFiles;
  }
};
