import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  DEVELOPMENT: process.env.DEVELOPMENT,
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRETE: process.env.CLOUDINARY_API_SECRETE,
  SECTECT_TOKEN_KEY: process.env.SECTECT_TOKEN_KEY,
  GOOGGLE_CLIENT_ID: process.env.GOOGGLE_clientID,
  GOOGGLE_CLIENT_SECRET: process.env.GOOGGLE_clientSecret,
  GOOGGLE_CALL_BACK_URL: process.env.GOOGGLE_callbackURL,
};
