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
exports.reviewServices = void 0;
const review_interface_1 = __importDefault(require("./review.interface"));
const postNewReviewToDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_interface_1.default.create(payload);
    if (result._id) {
        return "Review created successfully!";
    }
    else {
        return "Something went wrong!";
    }
});
const getProductReviewToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_interface_1.default.find({ productId: id });
    return result;
});
exports.reviewServices = {
    postNewReviewToDb,
    getProductReviewToDb,
};
