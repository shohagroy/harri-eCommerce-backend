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
exports.userControll = void 0;
const passport_1 = __importDefault(require("passport"));
const generateToken_1 = __importDefault(require("../../utils/generateToken"));
const google_config_1 = __importDefault(require("../../configs/google.config"));
const user_service_1 = require("./user.service");
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const createNewUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.userServices.createNewUserToDb(req.body);
    const token = yield (0, generateToken_1.default)(user);
    res.setHeader("Set-Cookie", `harriShop=${token}; Path=/;`);
    res.status(201).json({
        status: "success",
        message: "User created successfully!",
        user: user,
        token,
    });
}));
const userLogin = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate("local", (error, user, info) => {
        if (error) {
            return next(error);
        }
        if (!user) {
            return res
                .status(401)
                .json({ message: "Email or Password Incorrect!" });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(400).json({ message: "Something went Wrong!" });
            }
            const token = (0, generateToken_1.default)(user);
            user.password = "";
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Set-Cookie", `harriShop=${token}; Path=/;`);
            res.status(201).json({
                status: "success",
                message: "User Login Successfully!",
                user: user,
                token,
            });
        });
    })(req, res);
}));
const findLoginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const loginUser = yield user_service_1.userServices.fintLoginUserToDb(user === null || user === void 0 ? void 0 : user._id);
    res.status(200).json({
        status: "success",
        message: "user get successfully!",
        data: loginUser,
    });
}));
const userLoginWithGoogle = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientID, callbackURL } = google_config_1.default;
    const authenticationURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${callbackURL}&response_type=code&scope=email%20profile`;
    res.status(200).json({
        status: "success",
        message: "google auth url",
        data: authenticationURL,
    });
}));
const userLogout = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("user logged out");
    res.status(200).json({
        status: "success",
        message: "user logout successfully",
    });
}));
const updateUserInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const payload = req.body;
    const response = yield user_service_1.userServices.updateUserInfoToDb(user._id, payload);
    res.status(200).json({
        status: "success",
        message: "User Information Updated!",
        data: response,
    });
}));
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield user_service_1.userServices.getAllUserToDb();
    res.status(200).json({
        status: "success",
        message: "Users recvied Successfully!",
        data: response,
    });
}));
exports.userControll = {
    createNewUser,
    userLogin,
    userLoginWithGoogle,
    userLogout,
    updateUserInfo,
    getAllUsers,
    findLoginUser,
};
