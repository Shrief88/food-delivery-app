import path from "path";

import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";
import rateLimit from "express-rate-limit";
import ExpressMongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";

import env from "./config/validateEnv";
import errorMiddleware from "./middleware/errorMiddleware";
import categoryRouter from "./routes/category";
import mealRouter from "./routes/meal";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import reviewRouter from "./routes/review";
import orderRouter from "./routes/order";
import allowedOrgins from "./config/allowedOrgins";
import { webhookCheckout } from "./handlers/order";
import { xssFilter } from "./middleware/xssCleanMiddleware";

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
app.use(compression());
app.use(helmet());

if (env.isDevelopment) {
  app.use(morgan("dev"));
}

app.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  webhookCheckout,
);

app.use(express.json());
app.use(cookieParser());

// Sanitize data against NoSQL query injection
app.use(ExpressMongoSanitize());

// Sanitize data against XSS attack
app.use(xssFilter);

// Set static folder for image
app.use(express.static(path.join(__dirname, "..", "uploads")));

// Set rate limit
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    legacyHeaders: false,
    standardHeaders: "draft-7",
    message: "Too many requests created , please try again later",
  }),
);

app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/meal", mealRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.use(errorMiddleware);

export default app;
