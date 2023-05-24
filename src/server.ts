import app from "./app";
require("dotenv").config();
const mongoose = require("mongoose");

const port: string | number = process.env.PORT || 5000;
const uri: string | undefined = process.env.DB_URI;

async function dbConnection() {
  try {
    if (uri) {
      await mongoose.connect(uri);
      app.listen(port, () => {
        console.log(`server is listening on port: ${port}`);
      });
    } else {
      console.log("db uri is not defined");
    }
  } catch (err) {
    console.log(`Failed to connect database ${err}`);
  }
}

dbConnection();
