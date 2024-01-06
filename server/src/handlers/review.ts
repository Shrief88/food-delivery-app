import { type RequestHandler } from "express";
import createHttpError from "http-errors";

import ApiFeatures from "../utils/apiFeatures";
import { ReviewModel } from "../models/review";
import { type CustomRequest } from "./auth";

// @route GET /api/v1/review , GET api/v1/meal/:mealId/review
// @access Public
export const getReviews: RequestHandler = async (req, res, next) => {
  try {
    const documentCount = await ReviewModel.countDocuments();
    const apiFeatures = new ApiFeatures(
      ReviewModel.find(req.body.filterObject as object),
      req.query,
    )
      .filter()
      .sort()
      .fields()
      .pagination(documentCount)
      .search();

    const { mongooseQuery, paginationResult } = apiFeatures;
    const reviews = await mongooseQuery;

    res.status(200).json({
      result: reviews.length,
      paginationResult,
      data: reviews,
    });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/v1/review/:id
// @access Public
export const getReview: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const review = await ReviewModel.findById(id);
    if (!review) {
      throw createHttpError(404, "review not found");
    }
    res.status(200).json({ data: review });
  } catch (err) {
    next(err);
  }
};

// @route POST /api/v1/review, POST /api/v1/product/:productId/review
// @access Private [user]
export const createReview: RequestHandler = async (
  req: CustomRequest,
  res,
  next,
) => {
  try {
    req.body.user = req.user._id;
    const newReview = await ReviewModel.create(req.body);
    res.status(201).json({ data: newReview });
  } catch (err) {
    next(err);
  }
};

// @route PUT /api/v1/review/:id
// @access Private [user]
export const updateReview: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    const review = await ReviewModel.findByIdAndUpdate(
      id,
      { title: req.body.title, description: req.body.description },
      { new: true },
    );
    if (!review) {
      throw createHttpError(404, "review not found");
    }
    res.status(200).json({ data: review });
  } catch (err) {
    next(err);
  }
};

// @route DELETE /api/v1/review/:id
// @access Private
export const deleteReview: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const review = await ReviewModel.findById(id);
    if (!review) {
      throw createHttpError(404, "review not found");
    }
    await review.deleteOne();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
