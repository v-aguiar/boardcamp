import { stripHtml } from "string-strip-html";

import customer_schema from "../schemas/customer_schema.js";

export async function validateAddCustomer(req, res, next) {
  const { name, cpf, phone, birthday } = req.body;

  // Joi validation
  const validateCustomerData = customer_schema.validate(
    {
      name: typeof name === "string" ? stripHtml(name).result : name,
      cpf: typeof cpf === "string" ? stripHtml(cpf).result : cpf,
      phone: typeof phone === "string" ? stripHtml(phone).result : phone,
      birthday,
    },
    { abortEarly: false }
  );

  if (validateCustomerData.error) {
    console.error("⚠ Validation error! ", validateCustomerData.error.message);
    res.status(400).json({ error: validateCustomerData.error.message });
    return;
  }

  // TODO finalize middleware validation

  next();
}
