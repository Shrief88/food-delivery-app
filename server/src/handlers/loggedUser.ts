import { type RequestHandler } from "express";
import createHttpError from "http-errors";
import bycrpt from "bcryptjs";
import { type UpdateQuery } from "mongoose";
import slugify from "slugify";

import { type CustomRequest } from "./auth";
import { UserModel, type IUser } from "../models/user";
import { createAccessToken, createRefreshToken } from "../utils/createToken";
import { sanitizeUser } from "../utils/sanitizeData";

// @route GET /api/v1/user/me
// @access Private
export const getLoggedUser: RequestHandler = async (
  req: CustomRequest,
  res,
  next,
) => {
  try {
    req.params.id = req.user._id;
    next();
  } catch (err) {
    next(err);
  }
};

// @route PUT /api/v1/user/changeMyPassword
// @access Private
export const changeLoggedUserPassword: RequestHandler = async (
  req: CustomRequest,
  res,
  next,
) => {
  try {
    const id: string = req.user._id;
    req.body.password = await bycrpt.hash(req.body.password as string, 12);
    const user = await UserModel.findByIdAndUpdate(
      id,
      { password: req.body.password, passwordChangedAt: Date.now() },
      { new: true },
    );

    if (!user) {
      throw createHttpError(404, "user not found");
    }

    const accessToken = createAccessToken({ user_id: user._id });
    const refreshToken = createRefreshToken({ user_id: user._id });

    user.refreshToken = refreshToken;
    await user.save();

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ accessToken });
  } catch (err) {
    next(err);
  }
};

// @route PUT /api/v1/user/updateMe
// @access Private
export const updateLoggedUser: RequestHandler = async (
  req: CustomRequest,
  res,
  next,
) => {
  try {
    const id = req.user._id;
    if (req.body.name) {
      req.body.slug = slugify(req.body.name as string);
    }
    const updatedFields = {
      name: req.body.name ? req.body.name : undefined,
      slug: req.body.slug ? req.body.slug : undefined,
      email: req.body.email ? req.body.email : undefined,
    };

    const user = await UserModel.findByIdAndUpdate(
      id,
      updatedFields as UpdateQuery<IUser>,
      { new: true },
    );

    if (!user) {
      throw createHttpError(404, "user not found");
    }

    const sanitizedUser = sanitizeUser(user);
    res.status(200).json({ user: sanitizedUser });
  } catch (err) {
    next(err);
  }
};

// @route DELETE /api/v1/user/deleteMe
// @access Private
export const deleteLoggedUser: RequestHandler = async (
  req: CustomRequest,
  res,
  next,
) => {
  try {
    const id = req.user._id;
    await UserModel.findByIdAndUpdate(id, { active: false }, { new: true });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
