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
const globalErrorHandelar_1 = require("../../utils/globalErrorHandelar");
const category_service_1 = require("./category.service");
const postNewCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield (0, category_service_1.createNewCategoryToDB)(req.body);
        res.status(201).json({ status: "success", data: category });
    }
    catch (error) {
        (0, globalErrorHandelar_1.errorHandelar)(res, error);
    }
});
exports.postNewCategory = postNewCategory;
const getAllCategorys = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    try {
        const categorys = yield (0, category_service_1.getAllCategorysToDB)(query);
        res.status(200).json({
            status: "success",
            data: categorys.data,
            count: categorys.count,
        });
    }
    catch (error) {
        console.log(error);
        (0, globalErrorHandelar_1.errorHandelar)(res, error);
    }
});
exports.getAllCategorys = getAllCategorys;
const deleteCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, category_service_1.deleteCaregoryByIdToDB)(req.params.id);
        // console.log(response);
        if (response === null || response === void 0 ? void 0 : response.acknowledged) {
            res
                .status(200)
                .json({ status: "success", message: "Category Delete Successfully!" });
        }
    }
    catch (error) {
        (0, globalErrorHandelar_1.errorHandelar)(res, error);
    }
});
exports.deleteCategoryById = deleteCategoryById;
const updateCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, category_service_1.updateCaregoryByIdToDB)(req.body);
        if (response === null || response === void 0 ? void 0 : response._id) {
            res
                .status(200)
                .json({ status: "success", message: "Category updated Successfully!" });
        }
    }
    catch (error) {
        (0, globalErrorHandelar_1.errorHandelar)(res, error);
    }
});
exports.updateCategoryById = updateCategoryById;
