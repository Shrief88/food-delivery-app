import crypto from "crypto";

import { type Request, type RequestHandler } from "express";
import bycrpt from "bcryptjs";
import jwt from "jsonwebtoken";
import slugify from "slugify";
import createHttpError from "http-errors";

import env from "../config/validateEnv";
import { UserModel, type IUser } from "../models/user";
import { createAccessToken, createRefreshToken } from "../utils/createToken";
import { sendEmail } from "../utils/sendEmial";
import { sanitizeUser } from "../utils/sanitizeData";

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
        content: `Click on this Link to verify your email: ${env.CLIENT_URL}/verify/${code}`,
      });
    } catch (err) {
      console.log(err);
      throw createHttpError(500, "failed to send email");
    }

    await UserModel.create(req.body);
    res.status(201).json({ message: "code sent to email" });
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

    const accessToken = createAccessToken({ user_id: user._id });
    const refreshToken = createRefreshToken({ user_id: user._id });
    user.refreshToken = refreshToken;
    await user.save();

    const sanitizedUser = sanitizeUser(user);

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ user: sanitizedUser, accessToken });
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

    const accessToken = createAccessToken({ user_id: user._id });
    const refreshToken = createRefreshToken({ user_id: user._id });

    user.refreshToken = refreshToken;
    user.active = true;
    await user.save();

    const sanitizedUser = sanitizeUser(user);

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        domain:
          "food-delivery-app-dyvo-qawht6yq7-shrief-essams-projects.vercel.app",
      })
      .json({ user: sanitizedUser, accessToken });
  } catch (err) {
    next(err);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies.refreshToken) return res.sendStatus(204);

    const user = await UserModel.findOne({
      refreshToken: cookies.refreshToken,
    });

    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.sendStatus(204);
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    user.refreshToken = undefined;
    await user.save();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export const refreshAccessToken: RequestHandler = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (cookies.refreshToken) {
      const user = await UserModel.findOne({
        refreshToken: cookies.refreshToken,
      });
      if (user) {
        jwt.verify(
          cookies.refreshToken as string,
          env.REFRESH_TOKEN_SECRET,
          (err, decoded) => {
            if (err) {
              throw createHttpError(403, "Forbidden");
            }
            const sanitizedUser = sanitizeUser(user);
            const accessToken = createAccessToken({ user_id: user._id });
            res.status(200).json({ user: sanitizedUser, accessToken });
          },
        );
      } else {
        throw createHttpError(403, "Forbidden");
      }
    } else {
      throw createHttpError(401, "Unauthorized, please login");
    }
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
        const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
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

        const cookies = req.cookies;
        if (user.refreshToken !== cookies.refreshToken) {
          throw createHttpError(401, "user is not authenticated");
        }

        // verify if password has been changed after token was issued
        if (user.passwordChangedAt) {
          const changedTimestamp = Math.floor(
            user.passwordChangedAt.getTime() / 1000,
          );
          if (changedTimestamp > (decoded as jwtObject).iat) {
            throw createHttpError(
              401,
              "user recently changed password, please login again",
            );
          }
        }

        req.user = user;
      }
      next();
    }
    if (!token) {
      throw createHttpError(401, "Unauthorized, please login");
    }
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      next(createHttpError(403, "token expired"));
    }
    next(err);
  }
};

// @desc Creates a middleware function that checks if the user is allowed to access the route based on their roles.
export const restrictTo = (...roles: string[]): RequestHandler => {
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
