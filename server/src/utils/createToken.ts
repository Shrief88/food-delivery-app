import jwt from "jsonwebtoken";

import env from "../config/validateEnv";

interface PayloadObject {
  user_id: string;
}

const createToken = (paylod: PayloadObject): string => {
  return jwt.sign(paylod, env.JWT_SECRET, {
    expiresIn: env.EXPIRE_IN_TOKEN,
  });
};

export default createToken;
