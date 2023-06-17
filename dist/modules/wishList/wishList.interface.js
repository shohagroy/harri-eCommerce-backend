"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const wishListSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    images: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    unit: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    discount: {
        type: Number,
        required: true,
        trim: true,
    },
    totalPrice: {
        type: Number,
        required: true,
        trim: true,
    },
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
}, {
    timestamps: true,
});
const WishListProduct = (0, mongoose_1.model)("WishListProduct", wishListSchema);
exports.default = WishListProduct;
