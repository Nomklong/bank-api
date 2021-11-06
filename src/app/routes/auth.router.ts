import { Router } from "express";
import validate from "../middleware/validation.middleware";

import * as dotenv from "dotenv";
import { loginValidator } from "../validations/login.validation";
import {
  loginController,
  logoutController,
} from "../controllers/auth.controller";
dotenv.config();

// Export module for registering router in express app
export const router: Router = Router();

// Define your routes here
router.post("/login", validate(loginValidator), loginController);

router.post("/logout", logoutController);
