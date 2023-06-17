"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartListSchema = new mongoose_1.Schema({
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
    quantity: {
        type: Number,
        required: true,
        default: 1,
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
const CartListProduct = (0, mongoose_1.model)("CartListProduct", cartListSchema);
exports.default = CartListProduct;
