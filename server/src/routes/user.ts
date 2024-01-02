import express from "express";

import * as authHandler from "../handlers/auth";
import * as userHandler from "../handlers/user";
import * as userValidator from "../validators/user";

const userRouter = express.Router();

userRouter.get(
  "/",
  authHandler.protectRoute,
  authHandler.restrictTo("admin", "manager"),
  userHandler.getUsers,
);

userRouter.get(
  "/:id",
  authHandler.protectRoute,
  authHandler.restrictTo("admin", "manager"),
  userValidator.getUser,
  userHandler.getUser,
);

userRouter.post(
  "/",
  authHandler.protectRoute,
  authHandler.restrictTo("admin"),
  userValidator.createUser,
  userHandler.createUser,
);

userRouter.put(
  "/",
  authHandler.protectRoute,
  authHandler.restrictTo("admin"),
  userValidator.updateUser,
  userHandler.updateUser,
);

userRouter.put(
  "/changePassword",
  authHandler.protectRoute,
  authHandler.restrictTo("admin"),
  userValidator.updateUserPassword,
  userHandler.changeUserPassword,
);

userRouter.delete(
  "/:id",
  authHandler.protectRoute,
  authHandler.restrictTo("admin"),
  userValidator.deleteUser,
  userHandler.deleteUser,
);

export default userRouter;
