"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    icon: {
        type: [Object],
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
const Category = (0, mongoose_1.model)("Category", categorySchema);
exports.default = Category;
