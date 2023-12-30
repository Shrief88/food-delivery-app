import express from "express";

import * as categoryValidator from "../validators/category";
import * as categoryHandler from "../handlers/category";
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
  categoryValidator.createCategory,
  categoryHandler.createCategory,
);

categoryRouter.put(
  "/:id",
  categoryValidator.updateCategory,
  categoryHandler.updateCategory,
);

categoryRouter.delete(
  "/:id",
  categoryValidator.deleteCategory,
  categoryHandler.deleteCategory,
);

categoryRouter.use("/:categoryId/meals", mealRouter);

export default categoryRouter;
