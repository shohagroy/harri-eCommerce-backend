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
exports.userLogout = exports.userLoginWithGoogle = exports.findLoginUser = exports.userLogin = exports.createNewUser = void 0;
const passport_1 = __importDefault(require("passport"));
const user_service_1 = require("./user.service");
const generateToken_1 = __importDefault(require("../../utils/generateToken"));
const google_config_1 = __importDefault(require("../../configs/google.config"));
const createNewUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.createNewUserToDb)(req.body);
        const token = yield (0, generateToken_1.default)(user);
        res.setHeader("Set-Cookie", `harriShop=${token}; Path=/;`);
        res.status(201).json({
            status: "success",
            message: "User created successfully!",
            user: user,
            token,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createNewUser = createNewUser;
const userLogin = (req, res, next) => {
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
    })(req, res, next);
};
exports.userLogin = userLogin;
const findLoginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        const loginUser = yield (0, user_service_1.fintLoginUserToDb)(user === null || user === void 0 ? void 0 : user._id);
        res.status(200).json({
            status: "success",
            message: "user get successfully!",
            data: loginUser,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.findLoginUser = findLoginUser;
const userLoginWithGoogle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientID, callbackURL } = google_config_1.default;
    const authenticationURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${callbackURL}&response_type=code&scope=email%20profile`;
    res.status(200).json({
        status: "success",
        message: "google auth url",
        data: authenticationURL,
    });
});
exports.userLoginWithGoogle = userLoginWithGoogle;
const userLogout = (req, res, next) => {
    console.log("user logged out");
    res.status(200).json({
        status: "success",
        message: "user logout successfully",
    });
};
exports.userLogout = userLogout;
