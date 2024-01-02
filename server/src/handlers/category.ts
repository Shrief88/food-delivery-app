import { type RequestHandler } from "express";
import slugify from "slugify";
import { type UpdateQuery } from "mongoose";
import createHttpError from "http-errors";

import { CatogoryModel, type ICategory } from "../models/category";
import ApiFeatures from "../utils/apiFeatures";

// @route GET /api/v1/category
// @access Public
export const getCategories: RequestHandler = async (req, res, next) => {
  try {
    const documentCount = await CatogoryModel.estimatedDocumentCount();
    const apiFeatures = new ApiFeatures(CatogoryModel.find(), req.query)
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

// @route GET /api/v1/category/:id
// @access Public
export const getCategory: RequestHandler = async (req, res, next) => {
  try {
    const category = await CatogoryModel.findById(req.params.id);
    if (!category) throw createHttpError(404, "Category not found");
    res.status(200).json({ data: category });
  } catch (err) {
    next(err);
  }
};

// @route POST /api/v1/category
// @access Private [Admin, Manager]
export const createCategory: RequestHandler = async (req, res, next) => {
  try {
    req.body.slug = slugify(req.body.name as string);
    const newCategory = await CatogoryModel.create(req.body);
    res.status(201).json({ data: newCategory });
  } catch (err) {
    next(err);
  }
};

// @route PUT /api/v1/category/:id
// @access Private [Admin, Manager]
export const updateCategory: RequestHandler = async (req, res, next) => {
  try {
    req.body.slug = slugify(req.body.name as string);
    const updatedCategory = await CatogoryModel.findByIdAndUpdate(
      req.params.id,
      req.body as UpdateQuery<ICategory>,
      { new: true },
    );
    if (!updatedCategory) throw createHttpError(404, "Category not found");
    res.status(200).json({ data: updatedCategory });
  } catch (err) {
    next(err);
  }
};

// @route DELETE /api/v1/category/:id
// @access Private [Admin]
export const deleteCategory: RequestHandler = async (req, res, next) => {
  try {
    const category = await CatogoryModel.findByIdAndDelete(req.params.id);
    if (!category) throw createHttpError(404, "Category not found");
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
