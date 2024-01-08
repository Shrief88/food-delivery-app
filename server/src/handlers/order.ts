import { type RequestHandler } from "express";
import Stripe from "stripe";

import { type CustomRequest } from "./auth";
import { type IOrder, OrderModel } from "../models/order";
import createHttpError from "http-errors";
import env from "../config/validateEnv";
import { MealModel } from "../models/meal";

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
      success_url: `${env.CLIENT_URL}/order/success`,
      cancel_url: `${env.CLIENT_URL}/cart`,
      customer_email: req.user.email,
      client_reference_id: req.user._id,
      metadata: {
        cartItems: JSON.stringify(cartItems),
        shippingInfo: JSON.stringify(shippingInfo),
      },
    });

    res.status(200).json({ data: session.url });
  } catch (err) {
    next(err);
  }
};

export const webhookCheckout: RequestHandler = async (req, res, next) => {
  const sig = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body as string,
      sig,
      env.STRIPE_WEBHOOK_SECRET,
    );
    if (event?.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.client_reference_id;
      const price = (session.amount_total ?? 100) / 100;

      const cartItems = JSON.parse(
        session.metadata?.cartItems as unknown as string,
      );

      console.log(cartItems);
      const shippingInfo = JSON.parse(
        session.metadata?.shippingInfo as unknown as string,
      );
      console.log(shippingInfo);

      const order = await OrderModel.create({
        cartItems,
        shippingInfo,
        transactionFee: 1,
        shippingPrice: 0,
        totalPrice: price,
        user: userId,
        isPaid: true,
        paidAt: Date.now(),
      });

      console.log("Order created", order);
      if (order) {
        const bulkOption = order.cartItems.map((item) => {
          return {
            updateOne: {
              filter: { _id: item.mealId },
              update: {
                $inc: { quantity: -item.quantity, sold: +item.quantity },
              },
            },
          };
        });
        await MealModel.bulkWrite(bulkOption, {});
      }

      res.status(200).json({ success: true });
    }
  } catch (err) {
    next(err);
  }
};
