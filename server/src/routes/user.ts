import express from "express";

import * as authHandler from "../handlers/auth";
import * as adminHandler from "../handlers/admin";
import * as adminValidator from "../validators/admin";
import * as loggedUserHandler from "../handlers/loggedUser";

const userRouter = express.Router();

// logged user
userRouter.get(
  "/me",
  authHandler.protectRoute,
  loggedUserHandler.getLoggedUser,
  adminHandler.getUser,
);

// admin, manager only
userRouter.get(
  "/",
  authHandler.protectRoute,
  authHandler.restrictTo("admin", "manager"),
  adminHandler.getUsers,
);

userRouter.get(
  "/:id",
  authHandler.protectRoute,
  authHandler.restrictTo("admin", "manager"),
  adminValidator.getUser,
  adminHandler.getUser,
);

// admin only
userRouter.post(
  "/",
  authHandler.protectRoute,
  authHandler.restrictTo("admin"),
  adminValidator.createUser,
  adminHandler.createUser,
);

userRouter.put(
  "/changeRule/:id",
  authHandler.protectRoute,
  authHandler.restrictTo("admin"),
  adminValidator.changeUserRole,
  adminHandler.changeUserRole,
);

userRouter.delete(
  "/:id",
  authHandler.protectRoute,
  authHandler.restrictTo("admin"),
  adminValidator.deleteUser,
  adminHandler.deleteUser,
);

export default userRouter;
