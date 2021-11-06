import { UserNotFoundException } from "../common/exceptions/user-not-found.exception";
import jwt from "jwt-simple";
import { successHandler } from "../common/response";
import { Request, Response } from "express";
import config from "../../../config.json";
import { UserInstance } from "../services/user.service";

const loginController = async (req: Request, res: Response): Promise<void> => {
  const user: any = await UserInstance.find(req.body.email);

  if (!user) {
    throw UserNotFoundException.notFound();
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
};

const logoutController = (_req: Request, res: Response) => {
  const response = {
    message: "logout",
  };
  successHandler(res, response);
};

export { loginController, logoutController };
