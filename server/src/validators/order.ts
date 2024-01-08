/* eslint-disable @typescript-eslint/no-base-to-string */
import { param, body } from "express-validator";
import { OrderModel } from "../models/order";
import validateMiddleware from "../middleware/validatorMiddleware";
import { MealModel } from "../models/meal";

export const checkoutSession = [
  body("cartItems").isArray().withMessage("Invalid cart items"),
  body("cartItems.*.name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string")
    .trim()
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters long")
    .isLength({ max: 50 })
    .withMessage("name must be at most 50 characters long"),
  body("cartItems.*.mealId")
    .notEmpty()
    .withMessage("meal is required")
    .isMongoId()
    .withMessage("Invalid meal ID"),
  body("cartItems.*.quantity")
    .notEmpty()
    .withMessage("quantity is required")
    .isInt()
    .withMessage("quantity must be an integer"),
  body("cartItems.*.price")
    .notEmpty()
    .withMessage("price is required")
    .isNumeric()
    .withMessage("price must be a number"),
  body("cartItems.*.image")
    .notEmpty()
    .withMessage("image is required")
    .isString()
    .withMessage("image must be a string"),
  body("shippingInfo.address")
    .notEmpty()
    .withMessage("address is required")
    .isString()
    .withMessage("address must be a string"),
  body("shippingInfo.phone")
    .notEmpty()
    .withMessage("phone is required")
    .trim()
    .isMobilePhone("ar-EG")
    .withMessage("Invalid phone"),
  body("shippingInfo.city")
    .notEmpty()
    .withMessage("city is required")
    .isString()
    .withMessage("city must be a string"),
  body("shippingInfo.postalCode")
    .notEmpty()
    .withMessage("postal code is required")
    .isString()
    .withMessage("postal code must be a string"),
  body("cartItems.*").custom(async (item, { req }) => {
    const meal = await MealModel.findById(item.mealId);
    if (!meal) {
      throw new Error("Meal not found");
    }
    if (meal.quantity - item.quantity < 0) {
      throw new Error("Insufficient quantity");
    }

    if (item.price !== meal.price * item.quantity) {
      throw new Error("Price mismatch");
    }
    return true;
  }),
  validateMiddleware,
];

export const getOrder = [
  param("id")
    .isMongoId()
    .withMessage("Invalid ID")
    .custom(async (id, { req }) => {
      const order = await OrderModel.findById(id);
      if (!order) {
        throw new Error("Order not found");
      }
      if (
        order.user.toString() !== req.user._id.toString() &&
        req.user.role === "user"
      ) {
        throw new Error("Only admin or manager can see other users orders");
      }
    }),
  validateMiddleware,
];

export const updateDeliveredStatus = [
  param("id").isMongoId().withMessage("Invalid ID"),
  validateMiddleware,
];

export const updatePaidStatus = [
  param("id").isMongoId().withMessage("Invalid ID"),
  validateMiddleware,
];
