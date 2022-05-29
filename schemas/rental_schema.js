import joi from "joi";

const rental_schema = joi.object({
  customerId: joi.number().required().messages({
    "number.base": '"customerId" must be a number',
    "number.required": '"customerId" is required',
  }),
  gameId: joi.number().required().messages({
    "number.base": '"gameId" must be a number',
    "number.required": '"gameId" is required',
  }),
  daysRented: joi.number().min(1).required().messages({
    "number.base": '"daysRented" must be a number',
    "number.min": '"daysRented" must be greater than 0',
    "number.required": '"daysRented" is required',
  }),
});

export default rental_schema;
