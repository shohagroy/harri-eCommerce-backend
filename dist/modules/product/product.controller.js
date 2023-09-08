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
exports.productControllers = void 0;
const product_service_1 = require("./product.service");
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const postNewProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_service_1.productServices.createNewProductToDB(req.body);
    res.status(201).json({ status: "success", data: product });
}));
const getAllProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const products = yield product_service_1.productServices.getAllProductsToDB(query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Products Recvied successfully!",
        data: products,
    });
}));
const getSingleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.params.id;
    const product = yield product_service_1.productServices.getProductToDB(query);
    res.status(200).json({
        status: "success",
        data: product,
    });
}));
const deleteProductById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield product_service_1.productServices.deleteProductByIdToDB(req.params.id);
    if (response === null || response === void 0 ? void 0 : response.acknowledged) {
        res
            .status(200)
            .json({ status: "success", message: "Product Delete Successfully!" });
    }
}));
const updateProductById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield product_service_1.productServices.updateProductByIdToDB(req.body);
    if (response === null || response === void 0 ? void 0 : response._id) {
        res
            .status(200)
            .json({ status: "success", message: "Product updated Successfully!" });
    }
}));
exports.productControllers = {
    postNewProduct,
    getAllProducts,
    getSingleProduct,
    deleteProductById,
    updateProductById,
};
