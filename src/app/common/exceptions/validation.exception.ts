import { BaseError } from "./base.exception";

export class ValidationError extends BaseError {
  constructor(
    errors: any | any[],
    message: string = "ข้อมูลไม่ถูกต้อง",
    statusCode: number = 422
  ) {
    super(message, errors, statusCode);
  }
}
