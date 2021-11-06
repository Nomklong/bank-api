import Joi, { ObjectSchema } from "joi";

const loginValidator: { body: ObjectSchema<any> } = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().required(),
  }),
};

export { loginValidator };
