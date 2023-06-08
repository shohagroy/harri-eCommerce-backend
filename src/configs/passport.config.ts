import { compareSync } from "bcrypt";
import { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import User, { IUser } from "../modules/user/user.interface";

const passportConfig = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(async function (
      email: string,
      password: string,
      done: Function
    ) {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        if (!compareSync(password, user.password)) {
          console.log("Incorrect password");
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    })
  );

  //   passport.use(
  //     new GoogleStrategy(
  //       {
  //         clientID:
  //           "937758058789-rdq4pnb3er38o39ae6uuag7u3emtqpuf.apps.googleusercontent.com",
  //         clientSecret: "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",
  //         callbackURL: "http://localhost:5000/auth/callback",
  //       },
  //       async function (
  //         accessToken: string,
  //         refreshToken: string,
  //         profile: Profile,
  //         cb: Function
  //       ) {
  //         console.log(accessToken, refreshToken, profile);

  //         try {
  //           const user = await User.findOne({ uid: profile.id });

  //           if (!user) {
  //             const newUser = await User.create({
  //               email: profile.displayName,
  //               password: "",
  //               uid: profile.id,
  //             });

  //             return cb(null, newUser);
  //           }

  //           return cb(null, user);
  //         } catch (error) {
  //           return cb(error, null);
  //         }
  //       }
  //     )
  //   );

  passport.serializeUser(function (
    user: any,
    done: (err: any, id?: any) => void
  ) {
    done(null, user._id);
  });

  passport.deserializeUser(function (
    _id: any,
    done: (err: any, user?: any) => void
  ) {
    User.findOne({ _id }) // Assuming "_id" is the identifier for the User model
      .then((user) => {
        done(null, user);
      })
      .catch((error: Error) => {
        done(error);
      });
  });
};

export default passportConfig;
