import { type RequestHandler } from "express";
import Stripe from "stripe";

import { type CustomRequest } from "./auth";
import { type IOrder, OrderModel } from "../models/order";
import createHttpError from "http-errors";
import env from "../config/validateEnv";

export const getOrders: RequestHandler = async (
  req: CustomRequest,
  res,
  next,
) => {
  try {
    let orders: IOrder[] = [];
    if (req.user.role === "admin" || req.user.role === "manager") {
      orders = await OrderModel.find();
    } else {
      orders = await OrderModel.find({ user: req.user._id });
    }
    res.status(200).json({ data: orders });
  } catch (err) {
    next(err);
  }
};

export const getOrder: RequestHandler = async (
  req: CustomRequest,
  res,
  next,
) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
      throw createHttpError(404, "order not found");
    }
    res.status(200).json({ data: order });
  } catch (err) {
    next(err);
  }
};

export const updatePaidStatus: RequestHandler = async (req, res, next) => {
  try {
    const order = await OrderModel.findByIdAndUpdate(
      req.params.id,
      {
        isPaid: true,
        paidAt: Date.now(),
      },
      { new: true },
    );

    if (!order) {
      throw createHttpError(404, "Order not found");
    }
    res.status(200).json({ data: order });
  } catch (err) {
    next(err);
  }
};

export const updateDeliveredStatus: RequestHandler = async (req, res, next) => {
  try {
    const order = await OrderModel.findByIdAndUpdate(req.params.id, {
      isDelivered: true,
      deliveredAt: Date.now(),
    });
    if (!order) {
      throw createHttpError(404, "Order not found");
    }
    res.status(200).json({ data: order });
  } catch (err) {
    next(err);
  }
};

interface ICartItem {
  name: string;
  mealId: string;
  category: string;
  quantity: number;
  price: number;
  image: string;
}

const stripe = new Stripe(env.STRIPE_SECRET_KEY);
export const checkoutSession: RequestHandler = async (
  req: CustomRequest,
  res,
  next,
) => {
  try {
    const shippingPrice = 0;
    const transactionFee = 0;
    const cartItems = req.body.cartItems as ICartItem[];
    const shippingInfo = req.body.shippingInfo;

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

    const lineItems = [
      {
        price_data: {
          currency: "usd",
          unit_amount: (totalPrice + shippingPrice + transactionFee) * 100,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.protocol}://${req.get("host")}/success`,
      cancel_url: `${req.protocol}://${req.get("host")}/cart`,
      customer_email: req.user.email,
      client_reference_id: req.user._id,
      metadata: shippingInfo,
    });

    res.status(200).json({ data: session });
  } catch (err) {
    next(err);
  }
};
