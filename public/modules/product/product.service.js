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
exports.updateProductByIdToDB = exports.deleteProductByIdToDB = exports.getProductToDB = exports.getAllProductsToDB = exports.createNewProductToDB = void 0;
const mongoose_1 = require("mongoose");
const deleteImage_1 = __importDefault(require("../../utils/deleteImage"));
const uploadImages_1 = __importDefault(require("../../utils/uploadImages"));
const product_interface_1 = __importDefault(require("./product.interface"));
const createNewProductToDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const images = yield (0, uploadImages_1.default)(data.images);
    const response = yield product_interface_1.default.create(Object.assign(Object.assign({}, data), { images: images }));
    return response;
});
exports.createNewProductToDB = createNewProductToDB;
const getAllProductsToDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, skip, sort, searchByCategory } = query;
    const result = yield product_interface_1.default.aggregate([
        {
            $facet: {
                count: [
                    {
                        $group: {
                            _id: null,
                            count: { $sum: 1 },
                        },
                    },
                ],
                data: [
                    {
                        $match: {
                            $and: [
                                searchByCategory
                                    ? {
                                        "category.id": new mongoose_1.Types.ObjectId(searchByCategory),
                                    }
                                    : { title: { $regex: search } },
                            ],
                        },
                    },
                    {
                        $sort: { price: sort === "high" ? -1 : 1 },
                    },
                    {
                        $skip: parseInt(skip),
                    },
                    {
                        $limit: 10,
                    },
                ],
            },
        },
        {
            $project: {
                count: { $arrayElemAt: ["$count.count", 0] },
                data: 1,
            },
        },
    ]);
    return result[0];
});
exports.getAllProductsToDB = getAllProductsToDB;
const getProductToDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield product_interface_1.default.findById({ _id: query });
    return response;
});
exports.getProductToDB = getProductToDB;
const deleteProductByIdToDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_interface_1.default.aggregate([
        {
            $match: {
                _id: new mongoose_1.Types.ObjectId(id),
            },
        },
        {
            $project: {
                icon: 1,
            },
        },
        {
            $unset: [
                "title",
                "category",
                "__v",
                "_id",
                "unit",
                "quantity",
                "price",
                "discount",
                "tags",
                "description",
                "publish",
            ],
        },
    ]);
    yield (0, deleteImage_1.default)(result[0]);
    const response = yield product_interface_1.default.deleteOne({ _id: new mongoose_1.Types.ObjectId(id) });
    return response;
});
exports.deleteProductByIdToDB = deleteProductByIdToDB;
const updateProductByIdToDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { images, _id } = data;
    if (images[0].url) {
        const updatedProduct = yield product_interface_1.default.findByIdAndUpdate(_id, Object.assign({}, data), { new: true });
        return updatedProduct;
    }
    else {
        const result = yield product_interface_1.default.aggregate([
            {
                $match: {
                    _id: new mongoose_1.Types.ObjectId(_id),
                },
            },
            {
                $project: {
                    images: 1,
                },
            },
            {
                $unset: [
                    "title",
                    "category",
                    "__v",
                    "_id",
                    "unit",
                    "quantity",
                    "price",
                    "discount",
                    "tags",
                    "description",
                    "publish",
                ],
            },
        ]);
        yield (0, deleteImage_1.default)(result[0]);
        const updatedImages = yield (0, uploadImages_1.default)(data);
        const updatedProduct = yield product_interface_1.default.findByIdAndUpdate(_id, Object.assign(Object.assign({}, data), { images: updatedImages }), { new: true });
        return updatedProduct;
    }
});
exports.updateProductByIdToDB = updateProductByIdToDB;
