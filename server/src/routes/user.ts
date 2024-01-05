import express from "express";

import * as authHandler from "../handlers/auth";
import * as adminHandler from "../handlers/admin";
import * as adminValidator from "../validators/admin";
import * as loggedUserHandler from "../handlers/loggedUser";
import * as loggedUserValidator from "../validators/loggedUser";

const userRouter = express.Router();

userRouter.use(authHandler.protectRoute);

// logged user
userRouter.get("/me", loggedUserHandler.getLoggedUser, adminHandler.getUser);

userRouter.put(
  "/updateMe",
  loggedUserValidator.updateLoggedUser,
  loggedUserHandler.updateLoggedUser,
);

userRouter.put(
  "/changePassword",
  loggedUserValidator.changeLoggedUserPassword,
  loggedUserHandler.changeLoggedUserPassword,
);

userRouter.delete("/deleteMe", loggedUserHandler.deleteLoggedUser);

// admin, manager only
userRouter.get(
  "/",
  authHandler.restrictTo("admin", "manager"),
  adminHandler.getUsers,
);

userRouter.get(
  "/:id",
  authHandler.restrictTo("admin", "manager"),
  adminValidator.getUser,
  adminHandler.getUser,
);

// admin only
userRouter.post(
  "/",
  authHandler.restrictTo("admin"),
  adminValidator.createUser,
  adminHandler.createUser,
);

userRouter.put(
  "/changeRule/:id",
  authHandler.restrictTo("admin"),
  adminValidator.changeUserRole,
  adminHandler.changeUserRole,
);

userRouter.delete(
  "/:id",
  authHandler.restrictTo("admin"),
  adminValidator.deleteUser,
  adminHandler.deleteUser,
);

export default userRouter;
