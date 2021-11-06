import { BaseError } from "./base.exception";

export class UnauthorizedException extends BaseError {
  constructor() {
    super("unauthorized", [], 401);
  }
}
