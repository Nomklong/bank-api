import { BaseError } from "./base.exception";

export class WalletException extends BaseError {
  constructor(
    errors: any | any[],
    message: string = "Wallet Not Found",
    statusCode: number = 404
  ) {
    super(message, errors, statusCode);
  }

  static notFound() {
    throw new WalletException([]);
  }
}
