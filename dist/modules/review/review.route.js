"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouts = void 0;
const express_1 = __importDefault(require("express"));
const verifyTokenUser_1 = __importDefault(require("../../middlewares/verifyTokenUser"));
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
// user information route
router.route("/").post(verifyTokenUser_1.default, review_controller_1.reviewControllers.postProductReview);
router
    .route("/:id")
    .get(verifyTokenUser_1.default, review_controller_1.reviewControllers.getProductReviews);
exports.reviewRouts = router;
