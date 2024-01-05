import mongoose, { Schema } from "mongoose";
import bycrpt from "bcryptjs";

import returnImageUrl from "../utils/returnImageUrl";

enum Roles {
  ADMIN = "admin",
  USER = "user",
  MANAGER = "manager",
}

export interface IUser extends mongoose.Document {
  name: string;
  slug: string;
  email: string;
  password: string;
  image?: string;
  role: Roles;
  verified: boolean;
  verifyCode?: string;
  active: boolean;
  refreshToken?: string;
  passwordChangedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 32,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      required: true,
      type: String,
      enum: Object.values(Roles),
      default: Roles.USER,
    },
    active: {
      type: Boolean,
      default: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verifyCode: {
      type: String,
    },
    image: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    passwordChangedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.post<IUser>("init", function (doc) {
  returnImageUrl<IUser>(doc, "user");
});

userSchema.post<IUser>("save", function (doc) {
  returnImageUrl<IUser>(doc, "user");
});

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bycrpt.hash(this.password, 12);
});

export const UserModel = mongoose.model<IUser>("User", userSchema);
