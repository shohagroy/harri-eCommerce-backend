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
exports.getAallUserWishListToDB = exports.createUserWishListProductToDB = void 0;
const user_interface_1 = __importDefault(require("../user/user.interface"));
const wishList_interface_1 = __importDefault(require("./wishList.interface"));
const createUserWishListProductToDB = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = data;
    const product = yield wishList_interface_1.default.findOne({ productId: productId });
    if (!product) {
        const response = yield wishList_interface_1.default.create(Object.assign(Object.assign({}, data), { userId: user._id }));
        if (response) {
            yield user_interface_1.default.updateOne({ _id: user._id }, { $push: { wishList: productId } });
            return "Added to wish list!";
        }
    }
    else {
        const response = yield wishList_interface_1.default.findOneAndDelete({
            productId: productId,
        });
        if (response) {
            yield user_interface_1.default.updateOne({ _id: user._id }, { $pull: { wishList: productId } });
            return "Removed from wish list!";
        }
    }
});
exports.createUserWishListProductToDB = createUserWishListProductToDB;
const getAallUserWishListToDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userWishLists = yield wishList_interface_1.default.find({ userId: user === null || user === void 0 ? void 0 : user._id });
    return userWishLists;
});
exports.getAallUserWishListToDB = getAallUserWishListToDB;
