export class BaseError extends Error {
  statusCode: number;
  errors: any | any[];

  constructor(message: string, errors: any, statusCode: number) {
    super(message);

    this.errors = JSON.stringify(errors);
    this.statusCode = statusCode;
  }
}
