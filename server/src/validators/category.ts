import { param, body } from "express-validator";

import { CatogoryModel } from "../models/category";
import validateMiddleware from "../middleware/validatorMiddleware";

export const getCategory = [
  param("id").isMongoId().withMessage("Invalid ID"),
  validateMiddleware,
];

export const createCategory = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({ min: 3 })
    .withMessage("name must be more than 3 characters")
    .isLength({ max: 32 })
    .withMessage("name must be less than 32 characters")
    .custom(async (value: string) => {
      if (await CatogoryModel.findOne({ name: value })) {
        throw new Error("Category already exist");
      }
      return true;
    }),
  validateMiddleware,
];

export const updateCategory = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({ min: 3 })
    .withMessage("name must be more than 3 characters")
    .isLength({ max: 32 })
    .withMessage("name must be less than 32 characters")
    .custom(async (value: string) => {
      if (await CatogoryModel.findOne({ name: value })) {
        throw new Error("Category already exist");
      }
      return true;
    }),
  validateMiddleware,
];

export const deleteCategory = [
  param("id").isMongoId().withMessage("Invalid ID"),
  validateMiddleware,
];
