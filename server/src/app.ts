import path from "path";

import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import env from "../src/config/validateEnv";
import errorMiddleware from "./middleware/errorMiddleware";
import categoryRouter from "./routes/category";
import mealRouter from "./routes/meal";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import reviewRouter from "./routes/review";
import allowedOrgins from "./config/allowedOrgins";

const app = express();

const corsOptions = {
  credentials: true,
  origin: function (origin: string, callback: any) {
    if (!origin || allowedOrgins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

if (env.isDevelopment) {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());

// Set static folder for image
app.use(express.static(path.join(__dirname, "..", "uploads")));

app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/meal", mealRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/review", reviewRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.use(errorMiddleware);

export default app;
