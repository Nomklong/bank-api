import { UserException } from "../common/exceptions/user.exception";
import jwt from "jwt-simple";
import { successHandler } from "../common/response";
import { Request, Response } from "express";
import config from "../../../config.json";
import { UserInstance, UserType } from "../services/user.service";
import bcrypt from "bcrypt";
import { WalletInstance } from "../services/wallet.service";

const loginController = async (req: Request, res: Response): Promise<void> => {
  const user: any = await UserInstance.find(req.body.email);

  if (user === null) {
    throw UserException.notFound();
  }

  const checkPassword = await bcrypt.compare(req.body.password, user.password);

  if (!checkPassword) {
    throw UserException.userOrPasswordMismatch();
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

const registerController = async (req: Request, res: Response) => {
  const user: any = await UserInstance.find(req.body.email);

  if (user) {
    throw UserException.duplicateUser();
  }

  const { email, first_name, last_name, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const parameter: UserType = {
    email,
    first_name,
    last_name,
    password: hashPassword,
  };

  const newUser = await UserInstance.store(parameter);

  await WalletInstance.store(newUser._id);

  const response = {
    message: "Register successfully",
  };

  successHandler(res, response);
};

export { loginController, logoutController, registerController };
