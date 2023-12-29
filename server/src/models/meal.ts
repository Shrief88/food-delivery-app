import mongoose, { Schema } from "mongoose";

export interface IMeal extends mongoose.Document {
  name: string;
  slug: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
  sold: number;
  ratingAverage: number;
  ratingQuantity: number;
  category: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const mealSchema = new Schema<IMeal>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 50,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      minLength: 20,
      maxLength: 2000,
      trim: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    ratingAverage: {
      type: Number,
      min: 1,
      max: 5,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const MealModel = mongoose.model<IMeal>("Meal", mealSchema);
