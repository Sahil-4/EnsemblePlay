import express from "express";
import type { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_: Request, res: Response) => {
  res
    .status(200)
    .send({ statusCode: 200, success: true, message: "server is up and running", data: null });
});

export default app;
