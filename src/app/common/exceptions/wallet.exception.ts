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

  static notFoundTransferNumber() {
    throw new WalletException([], "Transfer wallet not found");
  }

  static notOnlyYourBalance() {
    throw new WalletException([], "Not only your balance", 400);
  }
}
