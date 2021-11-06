import { NextFunction, Request, Response } from "express";
import { BaseError } from "./exceptions/base.exception";
import httpStatus from "http-status";

const successHandler = (
  res: Response,
  data: any | any[] = [],
  statusCode: number = 200
): void => {
  const response = {
    data,
    status: {
      code: statusCode,
      message: httpStatus[statusCode],
    },
  };

  res.status(statusCode).json(response);
};

const errorHandler = (
  err: BaseError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.log(err);
  const response = {
    status: {
      code: err.statusCode,
      message: httpStatus[err.statusCode],
    },
    error: {
      message: err.message,
      errors: JSON.parse(err.errors),
    },
  };

  res.status(err.statusCode).send(response);
};

export { successHandler, errorHandler };
