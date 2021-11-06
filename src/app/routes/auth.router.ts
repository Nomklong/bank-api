import { Router } from "express";
import validate from "../middleware/validation.middleware";

import { loginValidator } from "../validations/login.validation";
import {
  loginController,
  logoutController,
} from "../controllers/auth.controller";
import { asyncHelper } from "../../utils/async-helper";

// Export module for registering router in express app
export const router: Router = Router();

// Define your routes here

router.post("/login", validate(loginValidator), asyncHelper(loginController));

router.post("/logout", logoutController);
