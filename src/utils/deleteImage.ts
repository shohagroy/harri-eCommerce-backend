const cloudinary = require("cloudinary").v2;
const { config } = require("../configs/cloudinary");

export default async (files: any) => {
  cloudinary.config(config);

  cloudinary.uploader.destroy("public_id", (error: any, result: any) => {
    if (error) {
      console.error(error);
    } else {
      console.log(result);
      // Image successfully deleted
    }
  });
};
