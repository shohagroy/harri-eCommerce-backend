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
exports.updateProductById = exports.deleteProductById = exports.getSingleProduct = exports.getAllProducts = exports.postNewProduct = void 0;
const globalErrorHandelar_1 = require("../../utils/globalErrorHandelar");
const product_service_1 = require("./product.service");
const postNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, product_service_1.createNewProductToDB)(req.body);
        res.status(201).json({ status: "success", data: product });
    }
    catch (error) {
        (0, globalErrorHandelar_1.errorHandelar)(res, error);
    }
});
exports.postNewProduct = postNewProduct;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    try {
        const products = yield (0, product_service_1.getAllProductsToDB)(query);
        res.status(200).json({
            status: "success",
            data: products.data,
            count: products.count,
        });
    }
    catch (error) {
        console.log(error);
        (0, globalErrorHandelar_1.errorHandelar)(res, error);
    }
});
exports.getAllProducts = getAllProducts;
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.params.id;
    try {
        const product = yield (0, product_service_1.getProductToDB)(query);
        res.status(200).json({
            status: "success",
            data: product,
        });
    }
    catch (error) {
        console.log(error);
        (0, globalErrorHandelar_1.errorHandelar)(res, error);
    }
});
exports.getSingleProduct = getSingleProduct;
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, product_service_1.deleteProductByIdToDB)(req.params.id);
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
exports.deleteProductById = deleteProductById;
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, product_service_1.updateProductByIdToDB)(req.body);
        if (response === null || response === void 0 ? void 0 : response._id) {
            res
                .status(200)
                .json({ status: "success", message: "Product updated Successfully!" });
        }
    }
    catch (error) {
        console.log(error);
        (0, globalErrorHandelar_1.errorHandelar)(res, error);
    }
});
exports.updateProductById = updateProductById;
