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
exports.updateCategoryById = exports.deleteCategoryById = exports.getAllCategorys = exports.postNewCategory = void 0;
const category_service_1 = require("./category.service");
const postNewCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield (0, category_service_1.createNewCategoryToDB)(req.body);
        res.status(201).json({
            status: "success",
            message: "Category Create Successfully!",
            data: category,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.postNewCategory = postNewCategory;
const getAllCategorys = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    try {
        const categorys = yield (0, category_service_1.getAllCategorysToDB)(query);
        res.status(200).json({
            status: "success",
            message: "Get all Category Successfully!",
            data: categorys,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllCategorys = getAllCategorys;
const deleteCategoryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, category_service_1.deleteCaregoryByIdToDB)(req.params.id);
        res.status(200).json({
            status: "success",
            message: "Category Delete Successfully!",
            data: response,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCategoryById = deleteCategoryById;
const updateCategoryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, category_service_1.updateCaregoryByIdToDB)(req.body);
        if (response === null || response === void 0 ? void 0 : response._id) {
            res.status(200).json({
                status: "success",
                message: "Category Update Successfully!",
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateCategoryById = updateCategoryById;
