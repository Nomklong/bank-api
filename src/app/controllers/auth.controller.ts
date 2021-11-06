import { UserNotFoundException } from "../common/exceptions/user-not-found.exception";
import jwt from "jwt-simple";
import { successHandler } from "../common/response";
import { NextFunction, Request, Response } from "express";
import config from "../../../config.json";
import { UserInstance } from "../services/user.service";
import bcrypt from "bcrypt";

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user: any = await UserInstance.find(req.body.email);

    if (user === null) {
      throw UserNotFoundException.notFound();
    }

    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkPassword) {
      throw UserNotFoundException.userOrPasswordMismatch();
    }
    const payload = {
      id: user._id,
      email: user.email,
      iat: new Date().getTime(),
    };

    const response = {
      token: jwt.encode(payload, process.env.SECRET_KEY || config.SECRET_KEY),
    };

    successHandler(res, response);
  } catch (err) {
    next(err);
  }
};

const logoutController = (_req: Request, res: Response) => {
  const response = {
    message: "logout",
  };
  successHandler(res, response);
};

export { loginController, logoutController };
