import express, { type RequestHandler } from "express";
import cors from "cors";
import morgan from "morgan";

import env from "../src/config/validateEnv";
import errorMiddleware from "./middleware/errorMiddleware";

const app = express();

app.use(cors());

const corsOptions: RequestHandler = cors();
app.options("*", corsOptions);

if (env.isDevelopment) {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.use(errorMiddleware);

export default app;
