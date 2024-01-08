import express from "express";

import * as orderHandler from "../handlers/order";
import * as orderValidator from "../validators/order";
import * as authHandler from "../handlers/auth";

const orderRouter = express.Router();

orderRouter.use(authHandler.protectRoute);

orderRouter.get("/", orderHandler.getOrders);

orderRouter.get(
  "/checkout",
  authHandler.restrictTo("user"),
  orderValidator.checkoutSession,
  orderHandler.checkoutSession,
);

orderRouter.get("/:id", orderValidator.getOrder, orderHandler.getOrder);

orderRouter.put(
  "/:id/paid",
  authHandler.restrictTo("admin", "manager"),
  orderValidator.updatePaidStatus,
  orderHandler.updatePaidStatus,
);

orderRouter.put(
  "/:id/delivered",
  authHandler.restrictTo("admin", "manager"),
  orderValidator.updateDeliveredStatus,
  orderHandler.updateDeliveredStatus,
);

export default orderRouter;
