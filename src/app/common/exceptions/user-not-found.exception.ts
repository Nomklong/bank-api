import { BaseError } from "./base.exception";

export class UserNotFoundException extends BaseError {
  constructor() {
    super("User Not found", [], 404);
  }
}
