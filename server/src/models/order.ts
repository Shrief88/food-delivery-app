import mongoose from "mongoose";

export interface IOrder extends mongoose.Document {
  cartItems: [
    {
      meal: mongoose.Schema.Types.ObjectId;
      qunatity: number;
      price: number;
    },
  ];
  totalPrice: number;
  user: mongoose.Schema.Types.ObjectId;
  shippingPrice: number;
  transactionFee: number;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [
      {
        meal: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Meal",
          required: true,
        },
        qunatity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    shippingPrice: {
      type: Number,
      required: true,
    },
    transactionFee: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      address: { type: String, required: true },
      phone: { type: String, required: true },
      city: { type: String, required: true },
      postcode: { type: String, required: true },
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export const OrderModel = mongoose.model<IOrder>("Order", orderSchema);
