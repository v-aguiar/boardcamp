import { stripHtml } from "string-strip-html";

import customer_schema from "../schemas/customer_schema.js";
import db from "../db/db.js";

export async function validateAddCustomer(req, res, next) {
  const { name, cpf, phone, birthday } = req.body;

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

  try {
    const sameCustomer = await db.query(
      `SELECT * FROM customers WHERE cpf = $1`,
      [stripHtml(cpf).result]
    );

    if (sameCustomer.rows.length > 0) {
      res.status(409).send("⚠ Conflict! Customer already registered...");
      return;
    }

    next();
  } catch (err) {
    console.error("⚠ Error validating customer data input!", err);
    res.status(422).send("⚠ Error validating customer data input!");
  }
}
