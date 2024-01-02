import { type RequestHandler } from "express";
import slugify from "slugify";
import { type UpdateQuery } from "mongoose";
import createHttpError from "http-errors";

import { MealModel, type IMeal } from "../models/meal";
import ApiFeatures from "../utils/apiFeatures";

// @route GET /api/v1/meal
// @access Public
export const getMeals: RequestHandler = async (req, res, next) => {
  try {
    const documentCount = await MealModel.countDocuments(
      req.body.filterObject as object,
    );
    const apiFeatures = new ApiFeatures(
      MealModel.find(req.body.filterObject as object),
      req.query,
    )
      .filter()
      .sort()
      .fields()
      .pagination(documentCount)
      .search();

    const { mongooseQuery, paginationResult } = apiFeatures;
    const categories = await mongooseQuery;

    res.status(200).json({
      result: categories.length,
      pagination: paginationResult,
      data: categories,
    });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/v1/meal/:id
// @access Public
export const getMeal: RequestHandler = async (req, res, next) => {
  try {
    const meal = await MealModel.findById(req.params.id);
    if (!meal) throw createHttpError(404, "Meal not found");
    res.status(200).json({ data: meal });
  } catch (err) {
    next(err);
  }
};

// @route POST /api/v1/meal
// @access Private [Admin, Manager]
export const createMeal: RequestHandler = async (req, res, next) => {
  try {
    req.body.slug = slugify(req.body.name as string);
    const newMeal = await MealModel.create(req.body);
    res.status(201).json({ data: newMeal });
  } catch (err) {
    next(err);
  }
};

// @route PUT /api/v1/meal/:id
// @access Private [Admin, Manager]
export const updateMeal: RequestHandler = async (req, res, next) => {
  try {
    if (req.body.name) req.body.slug = slugify(req.body.name as string);
    const updatedMeal = await MealModel.findByIdAndUpdate(
      req.params.id,
      req.body as UpdateQuery<IMeal>,
      { new: true },
    );
    if (!updatedMeal) throw createHttpError(404, "Meal not found");
    res.status(200).json({ data: updatedMeal });
  } catch (err) {
    next(err);
  }
};

// @route DELETE /api/v1/meal/:id
// @access Private [Admin]
export const deleteMeal: RequestHandler = async (req, res, next) => {
  try {
    const meal = await MealModel.findByIdAndDelete(req.params.id);
    if (!meal) throw createHttpError(404, "Meal not found");
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
