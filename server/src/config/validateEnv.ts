import { cleanEnv, str, port } from "envalid";
import dotenv from "dotenv";

dotenv.config();

export default cleanEnv(process.env, {
  PORT: port(),
  NODE_ENV: str({ choices: ["development", "test", "production"] }),
  MONGO_URI: str(),
  BASE_URL: str(),

  ACCESS_TOKEN_SECRET: str(),
  REFRESH_TOKEN_SECRET: str(),

  EMAIL_HOST: str(),
  EMAIL_PORT: port(),
  EMAIL_USER: str(),
  EMAIL_PASSWORD: str(),
  CLIENT_URL: str(),

  STRIPE_SECRET_KEY: str(),
});
