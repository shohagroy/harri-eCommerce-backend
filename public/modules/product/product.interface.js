"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    images: {
        type: [Object],
        required: true,
    },
    category: {
        name: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        id: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
    },
    unit: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        default: 0,
        min: 0,
    },
    discount: {
        type: Number,
        required: true,
        trim: true,
        default: 0,
        min: 0,
    },
    tags: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    publish: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});
const Product = (0, mongoose_1.model)("Product", productSchema);
exports.default = Product;
