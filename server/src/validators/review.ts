/* eslint-disable @typescript-eslint/no-base-to-string */
import { body, param } from "express-validator";

import { MealModel } from "../models/meal";
import { ReviewModel } from "../models/review";
import validateMiddleware from "../middleware/validatorMiddleware";

export const getReview = [
  param("id").isMongoId().withMessage("Invalid ID"),
  validateMiddleware,
];

export const createReview = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isString()
    .withMessage("Invalid title"),
  body("description").optional().isString().withMessage("Invalid description"),
  body("meal")
    .notEmpty()
    .withMessage("meal is required")
    .isMongoId()
    .withMessage("Invalid product ID")
    .custom(async (id: string) => {
      if (!(await MealModel.findById(id).exec())) {
        throw new Error("Invalid Product ID");
      }
      return true;
    })
    .custom(async (meal: string, { req }) => {
      if (
        await ReviewModel.findOne({
          user: req.user._id,
          meal,
        })
      ) {
        throw new Error("User already reviewed this product");
      }
      return true;
    }),
  validateMiddleware,
];

export const updateReview = [
  body("title").optional().isString().withMessage("Invalid title"),
  body("description").optional().isString().withMessage("Invalid description"),
  param("id")
    .isMongoId()
    .withMessage("Invalid ID")
    .custom(async (id, { req }) => {
      const review = await ReviewModel.findById(id).exec();
      if (!review) {
        throw new Error("Review not found");
      }

      // getting userId from review because we applied populate in review model to return an object with user_id
      if (review.user.toString() !== req.user._id.toString()) {
        throw new Error("This review is not belong to this user");
      }
      return true;
    }),
  validateMiddleware,
];

export const deleteReview = [
  param("id")
    .isMongoId()
    .withMessage("Invalid ID")
    .custom(async (id, { req }) => {
      const review = await ReviewModel.findById(id).exec();
      if (!review) {
        throw new Error("Review not found");
      }
      if (review.user.toString() !== req.user._id.toString()) {
        throw new Error("This review is not belong to this user");
      }
      return true;
    }),
  validateMiddleware,
];
