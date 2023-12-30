import path from "path";

import express, { type RequestHandler } from "express";
import cors from "cors";
import morgan from "morgan";

import env from "../src/config/validateEnv";
import errorMiddleware from "./middleware/errorMiddleware";
import categoryRouter from "./routes/category";
import mealRouter from "./routes/meal";

const app = express();

app.use(cors());

const corsOptions: RequestHandler = cors();
app.options("*", corsOptions);

if (env.isDevelopment) {
  app.use(morgan("dev"));
}

app.use(express.json());

// Set static folder for image
app.use(express.static(path.join(__dirname, "..", "uploads")));

app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/meal", mealRouter);
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.use(errorMiddleware);

export default app;
