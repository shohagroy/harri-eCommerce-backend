import { Request, Response } from "express";

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extends: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("harri shop server is running...");
});

export default app;
