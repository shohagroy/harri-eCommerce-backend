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
exports.categoryServices = void 0;
const mongoose_1 = require("mongoose");
const deleteImage_1 = __importDefault(require("../../utils/deleteImage"));
const uploadImages_1 = __importDefault(require("../../utils/uploadImages"));
const category_interface_1 = __importDefault(require("./category.interface"));
const createNewCategoryToDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const iconData = [data === null || data === void 0 ? void 0 : data.icon];
    const icon = yield (0, uploadImages_1.default)(iconData);
    const response = yield category_interface_1.default.create(Object.assign(Object.assign({}, data), { icon: icon }));
    return response;
});
const getAllCategorysToDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, skip } = query;
    const result = yield category_interface_1.default.aggregate([
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
                        $match: { name: { $regex: search } },
                    },
                    {
                        $sort: { createdAt: -1 },
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
const deleteCaregoryByIdToDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_interface_1.default.aggregate([
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
            $unset: ["name", "publish", "__v", "_id"],
        },
    ]);
    if (result[0].icon[0].id) {
        yield (0, deleteImage_1.default)(result[0].icon);
        const response = yield category_interface_1.default.deleteOne({ _id: new mongoose_1.Types.ObjectId(id) });
        return response;
    }
});
const updateCaregoryByIdToDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, icon, publish, _id } = data;
    if (icon.length > 1) {
        const result = yield category_interface_1.default.aggregate([
            {
                $match: {
                    _id: new mongoose_1.Types.ObjectId(_id),
                },
            },
            {
                $project: {
                    icon: 1,
                },
            },
            {
                $unset: ["name", "publish", "__v", "_id"],
            },
        ]);
        if (result[0].icon[0].id) {
            yield (0, deleteImage_1.default)(result[0].icon);
        }
        const updateIcon = yield (0, uploadImages_1.default)(data.icon);
        const updatedCategory = yield category_interface_1.default.findByIdAndUpdate(_id, {
            name: name,
            icon: updateIcon,
            publish: publish,
        }, { new: true });
        return updatedCategory;
    }
    else {
        const updatedCategory = yield category_interface_1.default.findByIdAndUpdate(_id, {
            name: name,
            icon: icon,
            publish: publish,
        }, { new: true });
        return updatedCategory;
    }
});
exports.categoryServices = {
    createNewCategoryToDB,
    getAllCategorysToDB,
    deleteCaregoryByIdToDB,
    updateCaregoryByIdToDB,
};
