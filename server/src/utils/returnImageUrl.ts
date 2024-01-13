import type mongoose from "mongoose";
import env from "../config/validateEnv";

interface documentWithImageUrl extends mongoose.Document {
  image?: string;
}

// Return image url in the response
const returnImageUrl = function <T extends documentWithImageUrl>(
  doc: mongoose.Document,
  modelName: string,
): void {
  const document = doc as T;
  if (document.image) {
    const imageUrl = `${env.BASE_URL}:${env.PORT}/${modelName}/${document.image}`;
    document.image = imageUrl;
  }
};

export default returnImageUrl;
