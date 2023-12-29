import { type RequestHandler } from "express";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

export const resizeImage = (
  modelName: string,
  path: string,
): RequestHandler => {
  return async (req, res, next) => {
    if (req.file) {
      const fileName = `${modelName}-${uuidv4()}-${Date.now()}.jpg`;
      try {
        await sharp(req.file?.buffer)
          .resize(600, 600)
          .toFormat("jpg")
          .toFile(`uploads/${modelName}/${fileName}`);
        req.body[path] = fileName;
      } catch (err) {
        next(err);
      }
    }
  };
};
