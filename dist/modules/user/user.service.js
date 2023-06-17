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
exports.fintLoginUserToDb = exports.createNewUserToDb = void 0;
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const user_interface_1 = __importDefault(require("./user.interface"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createNewUserToDb = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, confirmPassword } = userInfo;
    if (password !== confirmPassword) {
        throw new ApiError_1.default(400, "Password did not Match!");
    }
    const alreadyRegistered = yield user_interface_1.default.findOne({ email: email });
    if (!alreadyRegistered) {
        const newUser = {
            firstName: "",
            lastName: "",
            avatar: "",
            email: email,
            password: bcrypt_1.default.hashSync(password, 10),
            phone: "",
            address: "",
            role: "user",
            verified: false,
            wishList: [],
            cartList: [],
            buyerList: [],
        };
        const createUser = yield user_interface_1.default.create(newUser);
        createUser.password = "";
        return createUser;
    }
    else {
        throw new ApiError_1.default(400, "Email is Already Registered!");
    }
});
exports.createNewUserToDb = createNewUserToDb;
const fintLoginUserToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield user_interface_1.default.findById(id).select("-password");
    return response;
});
exports.fintLoginUserToDb = fintLoginUserToDb;
