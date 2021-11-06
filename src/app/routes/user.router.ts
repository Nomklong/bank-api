import { Router } from "express";

import { registerController } from "../controllers/auth.controller";
import { asyncHelper } from "../../utils/async-helper";
import validate from "../middleware/validation.middleware";
import { registerValidator } from "../validations/register.validation";
import { authMiddleware } from "../middleware/auth.middleware";

// Export module for registering router in express app
export const router: Router = Router();

// Define your routes here
router.post(
  "/register",
  validate(registerValidator),
  asyncHelper(registerController)
);

router.post("/check-balance", authMiddleware);
