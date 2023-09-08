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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryControllers = void 0;
const category_service_1 = require("./category.service");
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const postNewCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_service_1.categoryServices.createNewCategoryToDB(req.body);
    res.status(201).json({
        status: "success",
        message: "Category Create Successfully!",
        data: category,
    });
}));
const getAllCategorys = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const categorys = yield category_service_1.categoryServices.getAllCategorysToDB(query);
    res.status(200).json({
        status: "success",
        message: "Get all Category Successfully!",
        data: categorys,
    });
}));
const deleteCategoryById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield category_service_1.categoryServices.deleteCaregoryByIdToDB(req.params.id);
    res.status(200).json({
        status: "success",
        message: "Category Delete Successfully!",
        data: response,
    });
}));
const updateCategoryById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield category_service_1.categoryServices.updateCaregoryByIdToDB(req.body);
    if (response === null || response === void 0 ? void 0 : response._id) {
        res.status(200).json({
            status: "success",
            message: "Category Update Successfully!",
        });
    }
}));
exports.categoryControllers = {
    postNewCategory,
    getAllCategorys,
    deleteCategoryById,
    updateCategoryById,
};
