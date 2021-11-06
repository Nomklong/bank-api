import Joi, { ObjectSchema } from "joi";
import { NextFunction, Response, Request } from "express";
import { ValidationError } from "../common/exceptions/validation.exception";
import pick from "../../utils/pick";

export default (schema: {
    body?: ObjectSchema<any>;
    query?: ObjectSchema<any>;
  }): any =>
  (req: Request, _res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ["params", "query", "body"]);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: "key" }, abortEarly: false })
      .validate(object);

    let errorMessages = {};

    if (error) {
      const errorMessage = error.details.map((details) => {
        return Object.assign(
          {
            [`${details.context?.key}`]: details.message.replace(/['"]+/g, ""),
          },
          errorMessages
        );
      });

      return next(new ValidationError(errorMessage));
    }

    Object.assign(req, value);

    return next();
  };
