import { type NextFunction, type Request, type Response } from "express";

export const setFilterObject = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let filterObject = {};
  if (req.params.categoryId) {
    filterObject = {
      category: req.params.categoryId,
    };
  }
  req.body.filterObject = filterObject;
  next();
};
