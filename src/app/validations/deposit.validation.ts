import Joi, { ObjectSchema, LanguageMessages } from "joi";

const depositValidator: { body: ObjectSchema<any> } = {
  body: Joi.object().keys({
    balance: Joi.number()
      .required()
      .custom((value, helper) => {
        if (value >= 100 && value % 100 === 0) {
          return value;
        }

        const message: Joi.LanguageMessages =
          "Invalid banknote" as unknown as LanguageMessages;
        return helper.message(message);
      }),
  }),
};

export { depositValidator };
