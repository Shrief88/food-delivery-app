import { type RequestHandler } from "express";
import createHttpError from "http-errors";

const validateImageExisting: RequestHandler = async (req, res, next) => {
  if (!req.file) {
    next(createHttpError(400, "image is required!"));
  }
  next();
};

export default validateImageExisting;
