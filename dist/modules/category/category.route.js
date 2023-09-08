"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
// category route
router
    .route("/")
    .get(category_controller_1.categoryControllers.getAllCategorys)
    .post(category_controller_1.categoryControllers.postNewCategory);
router
    .route("/:id")
    .delete(category_controller_1.categoryControllers.deleteCategoryById)
    .put(category_controller_1.categoryControllers.updateCategoryById);
exports.categoryRoutes = router;
