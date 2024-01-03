import { cleanEnv, str, port } from "envalid";
import dotenv from "dotenv";

dotenv.config();

export default cleanEnv(process.env, {
  PORT: port(),
  NODE_ENV: str({ choices: ["development", "test", "production"] }),
  MONGO_URI: str(),
  BASE_URL: str(),
  JWT_SECRET: str(),
  EXPIRE_IN_TOKEN: str(),
  EMAIL_HOST: str(),
  EMAIL_PORT: port(),
  EMAIL_USER: str(),
  EMAIL_PASSWORD: str(),
  CLIENT_URL: str(),
});
