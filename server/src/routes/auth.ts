import { Router } from "express";

import * as authHandler from "../handlers/auth";
import * as authValidator from "../validators/auth";

const authRouter = Router();

authRouter.post("/signup", authValidator.signup, authHandler.signup);

authRouter.get("/verify/:code", authHandler.verifyEmail);

authRouter.post("/login", authValidator.login, authHandler.login);

authRouter.get("/refresh", authHandler.refreshAccessToken);

authRouter.get("/logout", authHandler.protectRoute, authHandler.logout);

export default authRouter;
