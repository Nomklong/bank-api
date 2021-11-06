import Joi, { ObjectSchema } from "joi";

const registerValidator: { body: ObjectSchema<any> } = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().required(),
    first_name: Joi.string().required().required(),
    last_name: Joi.string().required().required(),
  }),
};

export { registerValidator };
