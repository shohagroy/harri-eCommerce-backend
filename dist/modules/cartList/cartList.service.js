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
exports.cartListService = void 0;
const user_interface_1 = __importDefault(require("../user/user.interface"));
const cartList_interface_1 = __importDefault(require("./cartList.interface"));
const createUserCartListProductToDB = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = data;
    const product = yield cartList_interface_1.default.findOne({ productId: productId });
    if (!product) {
        const response = yield cartList_interface_1.default.create(Object.assign(Object.assign({}, data), { userId: user._id }));
        if (response) {
            yield user_interface_1.default.updateOne({ _id: user._id }, { $push: { cartList: productId } });
            return "Added to Cart list!";
        }
    }
    else {
        const response = yield cartList_interface_1.default.findOneAndDelete({
            productId: productId,
        });
        if (response) {
            yield user_interface_1.default.updateOne({ _id: user._id }, { $pull: { cartList: productId } });
            return "Removed from Cart list!";
        }
    }
});
const cartListProductQuentatyUpdated = (_id, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedData = { quantity: quantity };
    const cartItem = cartList_interface_1.default.findOneAndUpdate({ _id }, updatedData);
    return cartItem;
});
const getAallUserCartListToDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userCartLists = yield cartList_interface_1.default.find({ userId: user === null || user === void 0 ? void 0 : user._id });
    return userCartLists;
});
exports.cartListService = {
    createUserCartListProductToDB,
    getAallUserCartListToDB,
    cartListProductQuentatyUpdated,
};
