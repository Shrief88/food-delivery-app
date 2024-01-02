import express from "express";

import * as categoryValidator from "../validators/category";
import * as categoryHandler from "../handlers/category";
import * as authHandler from "../handlers/auth";
import mealRouter from "./meal";

const categoryRouter = express.Router();

categoryRouter.get("/", categoryHandler.getCategories);

categoryRouter.get(
  "/:id",
  categoryValidator.getCategory,
  categoryHandler.getCategory,
);

categoryRouter.post(
  "/",
  authHandler.protectRoute,
  authHandler.restrictTo("admin", "manager"),
  categoryValidator.createCategory,
  categoryHandler.createCategory,
);

categoryRouter.put(
  "/:id",
  authHandler.protectRoute,
  authHandler.restrictTo("admin", "manager"),
  categoryValidator.updateCategory,
  categoryHandler.updateCategory,
);

categoryRouter.delete(
  "/:id",
  authHandler.protectRoute,
  categoryValidator.deleteCategory,
  categoryHandler.deleteCategory,
);

categoryRouter.use("/:categoryId/meals", mealRouter);

export default categoryRouter;
