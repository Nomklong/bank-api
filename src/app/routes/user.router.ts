import { Router } from "express";

import * as dotenv from "dotenv";
import { loginController } from "../controllers/auth.controller";
import { asyncHelper } from "../../utils/async-helper";
dotenv.config();

// Export module for registering router in express app
export const router: Router = Router();

// Define your routes here
router.post("register", asyncHelper(loginController));
