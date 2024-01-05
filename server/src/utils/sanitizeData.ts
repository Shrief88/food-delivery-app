import { type IUser } from "../models/user";

export interface SanitizeUser {
  _id: IUser["_id"];
  name: IUser["name"];
  slug: IUser["slug"];
  email: IUser["email"];
  image: IUser["image"];
  role: IUser["role"];
}

export const sanitizeUser = (user: IUser): SanitizeUser => {
  return {
    _id: user._id,
    name: user.name,
    slug: user.slug,
    email: user.email,
    image: user.image,
    role: user.role,
  };
};
