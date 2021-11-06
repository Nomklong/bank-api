import { UserNotFoundException } from "../common/exceptions/user-not-found.exception";
import jwt from "jwt-simple";
import { successHandler } from "../common/response";
import { Request, Response } from "express";
import config from "../../../config.json";

const loginController = (req: Request, res: Response) => {
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
    token: jwt.encode(payload, process.env.SECRET_KEY || config.SECRET_KEY),
  };

  successHandler(res, response);
};

const logoutController = (_req: Request, res: Response) => {
  const response = {
    message: "logout",
  };
  successHandler(res, response);
};

export { loginController, logoutController };
