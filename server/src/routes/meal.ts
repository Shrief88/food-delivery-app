import express from "express";

import * as mealValidator from "../validators/meal";
import * as mealHandler from "../handlers/meal";
import { resizeImage } from "../middleware/imageProcessingMiddleware";
import { uploadImage } from "../middleware/uploadImageMiddleware";
import validateImageExisting from "../middleware/imageExistMiddlleware";
import { setFilterObject } from "../middleware/categoryToMeal";

const mealRouter = express.Router({
  mergeParams: true,
});

mealRouter.get("/", setFilterObject, mealHandler.getMeals);

mealRouter.get("/:id", mealValidator.getMeal, mealHandler.getMeal);

mealRouter.post(
  "/",
  uploadImage("image"),
  validateImageExisting,
  mealValidator.createMeal,
  resizeImage("meal", "image"),
  mealHandler.createMeal,
);

mealRouter.put(
  "/:id",
  uploadImage("image"),
  mealValidator.updateMeal,
  resizeImage("meal", "image"),
  mealHandler.updateMeal,
);

mealRouter.delete("/:id", mealValidator.deleteMeal, mealHandler.deleteMeal);

export default mealRouter;
