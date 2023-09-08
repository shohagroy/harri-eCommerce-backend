"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    rating: {
        type: Number,
        required: true,
    },
    reviewText: {
        type: String,
        required: true,
        trim: true,
    },
    userName: {
        type: String,
        trim: true,
    },
    userAvatar: {
        type: String,
        trim: true,
    },
    reviewDate: {
        type: String,
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
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
const Review = (0, mongoose_1.model)("Review", reviewSchema);
exports.default = Review;
