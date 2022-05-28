import joi from "joi";

const games_schema = joi.object({
  name: joi.string().required(),
  image: joi.string().uri().required(),
  stockTotal: joi.number().integer().min(0).required(),
  categoryId: joi.number().integer().required(),
  pricePerDay: joi.number().integer().min(0).required()
});

export default games_schema;