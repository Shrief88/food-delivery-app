import { body } from "express-validator";
import bycrpt from "bcryptjs";

import validateMiddleware from "../middleware/validatorMiddleware";
import { UserModel } from "../models/user";

export const changeLoggedUserPassword = [
  body("passwordConfirm")
    .notEmpty()
    .withMessage("password Confirmation is required"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Too short password")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error("passwords don't match");
      }
      return true;
    }),
  body("currentPassword")
    .notEmpty()
    .withMessage("current password is required")
    .custom(async (currentPassword, { req }) => {
      const user = await UserModel.findById(req.user._id).exec();
      if (!user) {
        throw new Error("user not found");
      }
      if (!(await bycrpt.compare(currentPassword as string, user.password))) {
        throw new Error("current password is incorrect");
      }
      return true;
    }),
  validateMiddleware,
];

export const updateLoggedUser = [
  body("name")
    .isString()
    .withMessage("name must be a string")
    .trim()
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters long")
    .isLength({ max: 32 })
    .withMessage("name must be at most 32 characters long"),
  body("email").trim().isEmail().withMessage("Invalid email"),
];
