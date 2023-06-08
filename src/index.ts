import app from "./app";
const mongoose = require("mongoose");
import env from "./configs/env.config";
import { errorLogger, logger } from "./shared/loggar";

import { Server } from "http";

const uri: string | undefined =
  process.env.NODE_ENV !== "production"
    ? "mongodb://127.0.0.1:27017/harri_shop"
    : env.DB_URI;

async function dbConnection() {
  try {
    if (env.DB_URI) {
      await mongoose.connect(uri);
      app.listen(env.PORT, () => {
        logger.info(`server is listening on port: ${env.PORT as string}`);
      });
    } else {
      errorLogger.error("db uri is not defined");
    }
  } catch (err) {
    errorLogger.error(`Failed to connect database ${err}`);
  }
}

dbConnection();
