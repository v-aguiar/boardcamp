import joi from "joi";

const category_schema = joi.object({
  name: joi.string().required().messages({
    'string.base': `"name" should be a type of 'text'`,
    'string.empty': `"name" cannot be an empty field`,
    'any.required': `"name" is a required field`
  })
})

export default category_schema;