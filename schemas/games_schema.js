import joi from "joi";

const games_schema = joi.object({
  name: joi.string().required().messages({
    'string.base': '"name" should be a string',
    'string.empty': '"name" cannot be an empty field',
    'any.required': '"name" is a required field',
  }),
  image: joi.string().uri().required().messages({
    'string.base': '"image" should be a string',
    'string.empty': '"image" cannot be an empty field',
    'string.uri': '"image" should be a valid URL',
    'any.required': '"image" is a required field',
  }),
  stockTotal: joi.number().integer().min(1).required().messages({
    'any.required': '"stockTotal" is a required field',
    'number.integer': '"stockTotal" should be an integer',
    'number.min': '"stockTotal" should be greater than 0',
  }),
  categoryId: joi.number().integer().required().messages({
    'any.required': '"categoryId" is a required field',
    'number.integer': '"categoryId" should be an integer',
  }),
  pricePerDay: joi.number().integer().min(1).required().messages({
    'any.required': '"pricePerDay" is a required field',
    'number.integer': '"pricePerDay" should be an integer',
    'number.min': '"pricePerDay" should be greater than 0',
  })
});

export default games_schema;