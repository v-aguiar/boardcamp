import joi from "joi";

const customer_schema = joi.object({
  name: joi.string().required().messages({
    "string.empty": '"name" cannot be an empty field',
    "string.required": '"name" is a required field',
  }),
  cpf: joi.string().min(11).max(11).required().messages({
    "string.empty": '"cpf" cannot be an empty field',
    "string.min": '"cpf" must have 11 characters',
    "string.required": '"cpf" is a required field',
  }),
  phone: joi.string().min(10).max(11).required().messages({
    "string.empty": '"phone" cannot be an empty field',
    "string.min": '"phone" must have 10 or 11 characters',
    "string.required": '"phone" is a required field',
  }),
  birthday: joi.date().required().messages({
    "date.base": '"birthday" should be a valid date',
    "date.required": '"birthday" is a required field',
  }),
});

export default customer_schema;
