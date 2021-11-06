import { BaseError } from "./base.exception";

export class RouteNotFoundException extends BaseError {
  constructor() {
    super("Route Not Found", ["RouteNotFoundException"], 404);
  }
}
