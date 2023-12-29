import express from "express";

import * as categoryValidator from "../validators/category";
import * as categoryHandler from "../handlers/category";

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

export default categoryRouter;
