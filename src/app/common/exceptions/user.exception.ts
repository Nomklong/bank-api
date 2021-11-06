import { BaseError } from "./base.exception";

export class UserException extends BaseError {
  constructor(
    errors: any | any[],
    message: string = "User Not Found",
    statusCode: number = 404
  ) {
    super(message, errors, statusCode);
  }

  static notFound() {
    throw new UserException([]);
  }

  static userOrPasswordMismatch() {
    throw new UserException([], "User or password mismatch", 400);
  }

  static duplicateUser() {
    throw new UserException([], "Duplicate user", 400);
  }
}
