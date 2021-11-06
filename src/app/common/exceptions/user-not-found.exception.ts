import { BaseError } from "./base.exception";

export class UserNotFoundException extends BaseError {
  constructor(
    errors: any | any[],
    message: string = "User Not Found",
    statusCode: number = 404
  ) {
    super(message, errors, statusCode);
  }

  static notFound() {
    throw new UserNotFoundException([]);
  }

  static userOrPasswordMismatch() {
    throw new UserNotFoundException([], "User or password mismatch", 400);
  }

  static duplicateUser() {
    throw new UserNotFoundException([], "Duplicate user", 400);
  }
}
