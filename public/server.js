"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("dotenv").config();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;
function dbConnection() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      if (uri) {
        yield mongoose.connect(uri);
        app_1.default.listen(port, () => {
          console.log(`server is listening on port: ${port}`);
        });
      } else {
        console.log("db uri is not defined");
      }
    } catch (err) {
      console.log(`Failed to connect database ${err}`);
    }
  });
}
dbConnection();
