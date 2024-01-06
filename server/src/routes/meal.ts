import express from "express";

import * as mealValidator from "../validators/meal";
import * as mealHandler from "../handlers/meal";
import * as authHandler from "../handlers/auth";
import { resizeImage } from "../middleware/imageProcessingMiddleware";
import { uploadImage } from "../middleware/uploadImageMiddleware";
import validateImageExisting from "../middleware/imageExistMiddlleware";
import { setFilterObject } from "../middleware/categoryToMeal";
import reviewRouter from "./review";

const mealRouter = express.Router({
  mergeParams: true,
});

mealRouter.get("/", setFilterObject, mealHandler.getMeals);

mealRouter.get("/:id", mealValidator.getMeal, mealHandler.getMeal);

mealRouter.post(
  "/",
  authHandler.protectRoute,
  authHandler.restrictTo("admin", "manager"),
  uploadImage("image"),
  validateImageExisting,
  mealValidator.createMeal,
  resizeImage("meal", "image"),
  mealHandler.createMeal,
);

mealRouter.put(
  "/:id",
  authHandler.protectRoute,
  authHandler.restrictTo("admin", "manager"),
  uploadImage("image"),
  mealValidator.updateMeal,
  resizeImage("meal", "image"),
  mealHandler.updateMeal,
);

mealRouter.delete(
  "/:id",
  authHandler.protectRoute,
  authHandler.restrictTo("admin"),
  mealValidator.deleteMeal,
  mealHandler.deleteMeal,
);

// Move all requests to api/v1/meal/:mealId/reviews to reviewRouter
mealRouter.use("/:mealId/reviews", reviewRouter);

export default mealRouter;
