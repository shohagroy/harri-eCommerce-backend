"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary = require("cloudinary").v2;
const { config } = require("../configs/cloudinary");
exports.default = (data) => __awaiter(void 0, void 0, void 0, function* () {
    cloudinary.config(config);
    const files = data;
    try {
        const uploadedFiles = yield Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield cloudinary.uploader.upload(file);
            const image = { url: result.secure_url, id: result.public_id };
            return image;
        })));
        return uploadedFiles;
    }
    catch (error) {
        console.error(error);
        return [];
    }
});
