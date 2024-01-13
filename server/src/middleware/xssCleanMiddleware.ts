import { type RequestHandler } from "express";
import { inHTMLData } from "xss-filters";

type CleanData = object | string;

const clean = (data: CleanData = ""): string | object => {
  let isObject = false;
  if (typeof data === "object") {
    data = JSON.stringify(data);
    isObject = true;
  }

  data = inHTMLData(data).trim();
  if (isObject) data = JSON.parse(data);

  return data;
};

export const xssFilter: RequestHandler = (req, res, next) => {
  if (req.body) req.body = clean(req.body as CleanData);
  if (req.query) (req.query as CleanData) = clean(req.query as CleanData);
  if (req.params) (req.params as CleanData) = clean(req.params as CleanData);

  next();
};
