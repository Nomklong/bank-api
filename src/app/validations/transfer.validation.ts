import Joi, { ObjectSchema } from "joi";

const transferValidation: { body: ObjectSchema<any> } = {
  body: Joi.object().keys({
    balance: Joi.number().min(1).required(),
    transfer_number: Joi.number().required(),
  }),
};

export { transferValidation };
