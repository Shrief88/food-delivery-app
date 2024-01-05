import { body, param } from "express-validator";
import { UserModel } from "../models/user";
import validateMiddleware from "../middleware/validatorMiddleware";

export const getUser = [
  param("id").isMongoId().withMessage("Invalid ID"),
  validateMiddleware,
];

export const createUser = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string")
    .trim()
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters long")
    .isLength({ max: 32 })
    .withMessage("name must be at most 32 characters long"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .trim()
    .isEmail()
    .withMessage("Invalid email"),
  body("role")
    .notEmpty()
    .withMessage("role is required")
    .matches(/^(admin|user|manager)$/i)
    .withMessage("Invalid role"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be a string")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Too short password")
    .custom((password, { req }) => {
      if (password !== String(req.body.passwordConfirm)) {
        throw new Error("passwords don't match");
      }
      return true;
    }),
  body("passwordConfirm")
    .notEmpty()
    .withMessage("password Confirmation is required")
    .isString()
    .withMessage("password must be a string"),
  body("email").custom(async (email: string) => {
    if (await UserModel.findOne({ email }).exec()) {
      throw new Error("user email already exists");
    }
    return true;
  }),
  validateMiddleware,
];

export const changeUserRole = [
  param("id").isMongoId().withMessage("Invalid ID"),
  body("role")
    .notEmpty()
    .withMessage("role is required")
    .matches(/^(admin|user|manager)$/i)
    .withMessage("Invalid role"),
  validateMiddleware,
];

export const deleteUser = [
  param("id").isMongoId().withMessage("Invalid ID"),
  validateMiddleware,
];
