"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        lowercase: true,
        trim: true,
    },
    lastName: {
        type: String,
        lowercase: true,
        trim: true,
    },
    avatar: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        required: true,
        lowercase: true,
    },
    verified: {
        type: Boolean,
    },
    wishList: [],
    cartList: [],
    buyList: [],
}, {
    timestamps: true,
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
