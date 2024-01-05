import { type RequestHandler } from "express";
import createHttpError from "http-errors";
import slugify from "slugify";

import ApiFeatures from "../utils/apiFeatures";
import { UserModel } from "../models/user";

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
    const user = await UserModel.create(req.body);

    res.status(200).json({ data: user });
  } catch (err) {
    next(err);
  }
};

// @route PUT /api/v1/user/changePassword/:id
// @access Private [admin]
export const changeUserRole: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const user = await UserModel.findByIdAndUpdate(
      id,
      { role: req.body.role },
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
