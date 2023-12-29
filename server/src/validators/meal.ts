import { body, param } from "express-validator";

import { MealModel } from "../models/meal";
import { CatogoryModel } from "../models/category";
import validateMiddleware from "../middleware/validatorMiddleware";

export const getMeal = [
  param("id").isMongoId().withMessage("Invalid ID"),
  validateMiddleware,
];

export const createMeal = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string")
    .trim()
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters long")
    .isLength({ max: 50 })
    .withMessage("name must be at most 50 characters long"),
  body("description")
    .notEmpty()
    .withMessage("description is required")
    .isString()
    .withMessage("description must be a string")
    .trim()
    .isLength({ min: 20 })
    .withMessage("description must be at least 20 characters long")
    .isLength({ max: 2000 })
    .withMessage("description must be at most 2000 characters long"),
  body("sold").optional().isNumeric().withMessage("sold must be a number"),
  body("quantity")
    .notEmpty()
    .withMessage("quantity is required")
    .isNumeric()
    .withMessage("quantity must be a number"),
  body("price")
    .notEmpty()
    .withMessage("price is required")
    .isNumeric()
    .withMessage("price must be a number"),
  body("category")
    .notEmpty()
    .withMessage("category is required")
    .isMongoId()
    .withMessage("Invalid ID")
    .custom(async (value: string) => {
      const category = await CatogoryModel.findById(value);
      if (!category) throw new Error("Category not found");
      return true;
    }),
  body("name").custom(async (value: string) => {
    if (await MealModel.findOne({ name: value })) {
      throw new Error("Meal already exist");
    }
    return true;
  }),
];

export const updateMeal = [
  param("id").isMongoId().withMessage("Invalid ID"),
  body("name")
    .optional()
    .isString()
    .withMessage("name must be a string")
    .trim()
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters long")
    .isLength({ max: 50 })
    .withMessage("name must be at most 50 characters long"),
  body("description")
    .optional()
    .isString()
    .withMessage("description must be a string")
    .trim()
    .isLength({ min: 20 })
    .withMessage("description must be at least 20 characters long")
    .isLength({ max: 2000 })
    .withMessage("description must be at most 2000 characters long"),
  body("sold").optional().isNumeric().withMessage("sold must be a number"),
  body("quantity")
    .optional()
    .isNumeric()
    .withMessage("quantity must be a number"),
  body("price").optional().isNumeric().withMessage("price must be a number"),
  body("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid ID")
    .custom(async (value: string) => {
      const category = await CatogoryModel.findById(value);
      if (!category) throw new Error("Category not found");
      return true;
    }),
  body("name").custom(async (value: string) => {
    if (await MealModel.findOne({ name: value })) {
      throw new Error("Meal already exist");
    }
    return true;
  }),
];

export const deleteMeal = [
  param("id").isMongoId().withMessage("Invalid ID"),
  validateMiddleware,
];
