import { compareSync, hashSync } from "bcrypt";
import { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import User from "../modules/user/user.interface";
import envConfig from "./env.config";

const passportConfig = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });

          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }

          if (!compareSync(password, user.password)) {
            console.log("Incorrect password");
            return done(null, false, { message: "Incorrect password." });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: envConfig.GOOGGLE_CLIENT_ID!,
        clientSecret: envConfig.GOOGGLE_CLIENT_SECRET!,
        callbackURL: envConfig.GOOGGLE_CALL_BACK_URL,
      },
      async function (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        cb: Function
      ) {
        const { sub, given_name, family_name, picture, email, email_verified } =
          profile?._json;

        const gogleUser = {
          firstName: given_name,
          lastName: family_name,
          avatar: picture,
          email: email,
          password: hashSync(sub, 10),
          phone: "",
          address: "",
          role: "user",
          verified: email_verified,
          wishList: [],
          cartList: [],
          buyerList: [],
        };

        try {
          const user = await User.findOne({ email: email });

          if (!user) {
            const newUser = await User.create(gogleUser);
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

          const newUpdatedUser = await User.findOneAndUpdate(
            { email },
            updatedUser,
            { new: true }
          );

          return cb(null, newUpdatedUser);
        } catch (error) {
          return cb(error, null);
        }
      }
    )
  );

  passport.serializeUser(function (
    user: any,
    done: (err: any, _id?: any) => void
  ) {
    done(null, user._id);
  });

  passport.deserializeUser(function (
    _id: any,
    done: (err: any, user?: any) => void
  ) {
    console.log(_id);
    User.findOne({ _id })
      .then((user) => {
        done(null, user);
      })
      .catch((error: Error) => {
        done(error);
      });
  });
};

export default passportConfig;
