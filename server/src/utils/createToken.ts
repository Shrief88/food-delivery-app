import jwt from "jsonwebtoken";

import env from "../config/validateEnv";

interface PayloadObject {
  user_id: string;
}

export const createAccessToken = (paylod: PayloadObject): string => {
  return jwt.sign(paylod, env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10s",
  });
};

export const createRefreshToken = (paylod: PayloadObject): string => {
  return jwt.sign(paylod, env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
