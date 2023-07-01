import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandelar";
import cookieParser from "cookie-parser";
import router from "./route/route";
import passport from "passport";
import passportConfig from "./configs/passport.config";
import session from "express-session";
import { IUser } from "./modules/user/user.interface";
import generateToken from "./utils/generateToken";
import { createProxyMiddleware } from "http-proxy-middleware";

const sslcommerzProxy = createProxyMiddleware({
  target: "https://sandbox.sslcommerz.com",
  changeOrigin: true,
});

const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    // origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));
app.use(
  session({
    secret: "your-secret-key", // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set it to true if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // Session expiration time (in milliseconds)
    },
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("harri shop server is running...");
});

app.use("/api/v1", router);
app.use(globalErrorHandler);
app.use(sslcommerzProxy);

app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/callback",
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", async (error: Error, user: IUser) => {
      const token = await generateToken(user);

      res.setHeader("Set-Cookie", `harriShop=${token}; Path=/;`);
      res.redirect("http://localhost:3000");
    })(req, res, next);
  }
);

export default app;
