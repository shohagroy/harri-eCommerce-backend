import bodyParser from "body-parser";
import { Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandelar";
import cookieParser from "cookie-parser";
import router from "./route/route";

const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("harri shop server is running...");
});

app.use("/api/v1", router);
app.use(globalErrorHandler);

export default app;
