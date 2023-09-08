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
const bcrypt_1 = require("bcrypt");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const user_interface_1 = __importDefault(require("../modules/user/user.interface"));
const env_config_1 = __importDefault(require("./env.config"));
const passportConfig = (passport) => {
    passport.use(new passport_google_oauth20_1.Strategy({
        clientID: env_config_1.default.GOOGGLE_CLIENT_ID,
        clientSecret: env_config_1.default.GOOGGLE_CLIENT_SECRET,
        callbackURL: env_config_1.default.DEVELOPMENT !== "production"
            ? env_config_1.default.GOOGGLE_CALL_BACK_URL
            : `${env_config_1.default.SERVER_URL}/auth/callback`,
    }, function (accessToken, refreshToken, profile, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sub, given_name, family_name, picture, email, email_verified } = profile === null || profile === void 0 ? void 0 : profile._json;
            const googleUser = {
                firstName: given_name,
                lastName: family_name,
                avatar: picture,
                email: email,
                password: (0, bcrypt_1.hashSync)(sub, 10),
                phone: "",
                address: "",
                city: "",
                state: "",
                zip: "",
                role: "user",
                verified: email_verified,
                wishList: [],
                cartList: [],
                buyerList: [],
            };
            try {
                const user = yield user_interface_1.default.findOne({ email: email });
                if (!user) {
                    const newUser = yield user_interface_1.default.create(googleUser);
                    return cb(null, newUser);
                }
                const updatedUser = {
                    firstName: given_name,
                    lastName: family_name,
                    avatar: picture,
                    email: email,
                    phone: "",
                    address: "",
                    verified: email_verified,
                };
                const newUpdatedUser = yield user_interface_1.default.findOneAndUpdate({ email }, updatedUser, { new: true });
                return cb(null, newUpdatedUser);
            }
            catch (error) {
                return cb(error, null);
            }
        });
    }));
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });
    passport.deserializeUser(function (_id, done) {
        user_interface_1.default.findOne({ _id })
            .then((user) => {
            done(null, user);
        })
            .catch((error) => {
            done(error);
        });
    });
};
exports.default = passportConfig;
