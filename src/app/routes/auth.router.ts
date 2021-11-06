import { Router } from "express";
import { successHandler } from "../common/response";
import { UserNotFoundException } from "../common/exceptions/user-not-found.exception";
import jwt from "jwt-simple";

import * as dotenv from "dotenv";
dotenv.config();

// Export module for registering router in express app
export const router: Router = Router();

// Define your routes here
router.post("/login", (req, res) => {
  if (
    req.body.email !== "nomklong@gmail.com" ||
    req.body.password !== "password"
  ) {
    throw new UserNotFoundException();
  }
  const payload = {
    id: 1,
    email: req.body.email,
    iat: new Date().getTime(),
  };

  const response = {
    token: jwt.encode(payload, process.env.SECRET_KEY || ""),
  };

  successHandler(res, response);
});

router.post("/logout", (req, res) => {
  const response = {
    message: "logout",
  };
  successHandler(res, response);
});
