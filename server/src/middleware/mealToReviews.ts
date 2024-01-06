import { type NextFunction, type Request, type Response } from "express";

export const setMealIdToBody = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.body.meal) {
    req.body.meal = req.params.mealId;
  }
  next();
};

export const setFilterObject = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let filterObject = {};
  if (req.params.mealId) {
    filterObject = {
      meal: req.params.mealId,
    };
  }
  req.body.filterObject = filterObject;
  next();
};
