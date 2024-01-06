import express from "express";

import * as reviewHandler from "../handlers/review";
import * as reviewValidator from "../validators/review";
import * as authHandler from "../handlers/auth";
import { setMealIdToBody, setFilterObject } from "../middleware/mealToReviews";

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.get("/", setFilterObject, reviewHandler.getReviews);

reviewRouter.get("/:id", reviewValidator.getReview, reviewHandler.getReview);

reviewRouter.post(
  "/",
  authHandler.protectRoute,
  authHandler.restrictTo("user"),
  setMealIdToBody,
  reviewValidator.createReview,
  reviewHandler.createReview,
);

reviewRouter.put(
  "/:id",
  authHandler.protectRoute,
  authHandler.restrictTo("user"),
  reviewValidator.updateReview,
  reviewHandler.updateReview,
);

reviewRouter.delete(
  "/:id",
  authHandler.protectRoute,
  reviewValidator.deleteReview,
  reviewHandler.deleteReview,
);

export default reviewRouter;
