import { type RequestHandler } from "express";
import { type UpdateQuery } from "mongoose";
import createHttpError from "http-errors";
import slugify from "slugify";
import bycrpt from "bcryptjs";

import ApiFeatures from "../utils/apiFeatures";
import { UserModel, type IUser } from "../models/user";
import { createAccessToken, createRefreshToken } from "../utils/createToken";

// @route GET /api/v1/user
// @access Private [admin, manager]
export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const documentCount = await UserModel.countDocuments();
    const apiFeatures = new ApiFeatures(UserModel.find(), req.query)
      .filter()
      .sort()
      .fields()
      .pagination(documentCount)
      .search();

    const { mongooseQuery, paginationResult } = apiFeatures;
    const users = await mongooseQuery;

    res.status(200).json({
      result: users.length,
      paginationResult,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/v1/user/:id
// @access Private [admin, manager]
export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const user = await UserModel.findById(id).exec();
    if (!user) {
      throw createHttpError(404, "user not found");
    }
    res.status(200).json({ data: user });
  } catch (err) {
    next(err);
  }
};

// @route POST /api/v1/user
// @access Private [admin]
export const createUser: RequestHandler = async (req, res, next) => {
  try {
    req.body.slug = slugify(req.body.name as string);
    req.body.verified = true;
    const accesstoken = createAccessToken({ user_id: req.body.name });
    const refreshtoken = createRefreshToken({ user_id: req.body.name });
    req.body.refreshToken = refreshtoken;
    await UserModel.create(req.body);

    res
      .status(200)
      .cookie("refreshToken", refreshtoken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ accesstoken });
  } catch (err) {
    next(err);
  }
};

// @route PUT /api/v1/user/:id
// @access Private [admin]
export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    if (req.body.name) {
      req.body.slug = slugify(req.body.name as string);
    }

    const { password, passwordConfirm, ...updatedFields } = req.body;
    const user = await UserModel.findByIdAndUpdate(
      id,
      updatedFields as UpdateQuery<IUser>,
      { new: true },
    ).exec();

    if (!user) {
      throw createHttpError(404, "user not found");
    }
    res.status(200).json({ data: user });
  } catch (err) {
    next(err);
  }
};

// @route PUT /api/v1/user/changePassword/:id
// @access Private [admin]
export const changeUserPassword: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    req.body.password = await bycrpt.hash(req.body.password as string, 12);
    const user = await UserModel.findByIdAndUpdate(
      id,
      { password: req.body.password, passwordChangedAt: Date.now() },
      { new: true },
    ).exec();
    if (!user) {
      throw createHttpError(404, "user not found");
    }
    res.status(200).json({ data: user });
  } catch (err) {
    next(err);
  }
};

// @route DELETE /api/v1/user/:id
// @access Private [admin]
export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw createHttpError(404, "user not found");
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
