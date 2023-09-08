"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const verifyTokenUser_1 = __importDefault(require("../../middlewares/verifyTokenUser"));
const router = express_1.default.Router();
// user route
// user information route
router
    .route("/")
    .patch(verifyTokenUser_1.default, user_controller_1.userControll.updateUserInfo)
    .get(verifyTokenUser_1.default, user_controller_1.userControll.getAllUsers);
router.route("/create-user").post(user_controller_1.userControll.createNewUser);
router.route("/login-user").post(user_controller_1.userControll.userLogin);
router.route("/login/auth/google").get(user_controller_1.userControll.userLoginWithGoogle);
router
    .route("/get-login-user")
    .get(verifyTokenUser_1.default, user_controller_1.userControll.findLoginUser);
router.route("/logout-user").post(user_controller_1.userControll.userLogout);
exports.userRoutes = router;
