import { BaseError } from "./base.exception";

export class ValidationError extends BaseError {
  constructor(
    errors: any | any[],
    message: string = "Invalid data",
    statusCode: number = 422
  ) {
    super(message, errors, statusCode);
  }
}
