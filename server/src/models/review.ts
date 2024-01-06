import mongoose, { Schema } from "mongoose";

export interface IReview extends mongoose.Document {
  title: string;
  description?: string;
  user: Schema.Types.ObjectId;
  meal: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    meal: {
      type: Schema.Types.ObjectId,
      ref: "Meal",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

reviewSchema.pre<IReview>(/^find/, function (next) {
  void this.populate({
    path: "user",
    select: "name",
  });
  next();
});

export const ReviewModel = mongoose.model<IReview>("Review", reviewSchema);
