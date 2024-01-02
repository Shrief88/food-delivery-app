import crypto from "crypto";

import { type Request, type RequestHandler } from "express";
import bycrpt from "bcryptjs";
import jwt from "jsonwebtoken";
import slugify from "slugify";
import createHttpError from "http-errors";

import env from "../config/validateEnv";
import { UserModel, type IUser } from "../models/user";
import createToken from "../utils/createToken";
import { sendEmail } from "../utils/sendEmial";
// import { type SanitizeUser, sanitizeUser } from "../utils/sanitizeDate";

interface jwtObject {
  user_id: string;
  iat: number;
  exp: number;
}

export interface CustomRequest extends Request {
  user: IUser;
}

// @route POST /api/v1/auth/signup
// @access Public
export const signup: RequestHandler = async (req, res, next) => {
  try {
    req.body.slug = slugify(req.body.name as string);
    req.body.role = "user";
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const hashCode = crypto.createHash("sha256").update(code).digest("hex");
    req.body.verifyCode = hashCode;

    try {
      await sendEmail({
        email: req.body.email,
        subject: "Verify your email",
        content: `Click on this Link to verify your email: ${env.BASE_URL}/api/v1/auth/verify/${code}`,
      });
    } catch (err) {
      console.log(err);
      throw createHttpError(500, "failed to send email");
    }

    await UserModel.create(req.body);
    res.status(200).json({ message: "code sent to email" });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/v1/auth/verify/:code
// @access Public
export const verifyEmail: RequestHandler = async (req, res, next) => {
  try {
    const code = req.params.code;
    const hashCode = crypto.createHash("sha256").update(code).digest("hex");
    const user = await UserModel.findOne({ verifyCode: hashCode });
    if (!user) throw createHttpError(404, "Verify code not found");
    user.verified = true;
    user.verifyCode = undefined;
    await user.save();
    const token = createToken({ user_id: user._id });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

// @route POST /api/v1/auth/login
// @access Public
export const login: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (
      !user ||
      !(await bycrpt.compare(req.body.password as string, user.password))
    ) {
      throw createHttpError(404, "Invalid credantials");
    }

    if (!user.verified) {
      throw createHttpError(401, "Email not verified");
    }

    const token = createToken({ user_id: user._id });
    res.status(200).json({ data: user, token });
  } catch (err) {
    next(err);
  }
};

// @desc Middleware function to protect routes.
export const protectRoute: RequestHandler = async (
  req: CustomRequest,
  res,
  next,
) => {
  try {
    let token = "";
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
      if (token) {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        const user = await UserModel.findById((decoded as jwtObject).user_id);

        // verify if user still exists
        if (!user) {
          throw createHttpError(401, "this user no longer exists");
        }

        // check if user delete his account
        if (!user.active) {
          throw createHttpError(401, "user is not active");
        }

        // check if user is verified
        if (!user.verified) {
          throw createHttpError(401, "user is not verified");
        }

        req.user = user;
      }
      next();
    }
    if (!token) {
      throw createHttpError(401, "Unauthorized, please login");
    }
  } catch (err) {
    next(err);
  }
};

// @desc Creates a middleware function that checks if the user is allowed to access the route based on their roles.
export const allowedTo = (...roles: string[]): RequestHandler => {
  return async (req: CustomRequest, res, next) => {
    try {
      if (!roles.includes(req.user.role as unknown as string)) {
        throw createHttpError(403, "Forbidden");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
