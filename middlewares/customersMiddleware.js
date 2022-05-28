import { stripHtml } from "string-strip-html";

import customer_schema from "../schemas/customer_schema.js";
import db from "../db/db.js";

export async function validateAddCustomer(req, res, next) {
  const { name, cpf, phone, birthday } = req.body;
  const id = req.params.id ? req.params.id : undefined;

  const nameStrip = typeof name === "string" ? stripHtml(name).result : name;
  const cpfStrip = typeof cpf === "string" ? stripHtml(cpf).result : cpf;
  const phoneStrip =
    typeof phone === "string" ? stripHtml(phone).result : phone;

  const validateCustomerData = customer_schema.validate(
    {
      name: nameStrip,
      cpf: cpfStrip,
      phone: phoneStrip,
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
    if (id !== undefined) {
      // validate if id belongs to a customer
      const customerDb = await db.query(
        `SELECT * FROM customers WHERE id = ${id}`
      );

      const customer = customerDb.rows[0];

      if (!customer) {
        console.error("⚠ Not found! No customer found with given id...");
        res.status(404).send("⚠ Not found! No customer found with given id...");
        return;
      }
    }

    // validate if input cpf does not belong to another customer
    const sameCustomer = await db.query(
      `SELECT * FROM customers WHERE cpf = $1`,
      [stripHtml(cpf).result]
    );

    if (sameCustomer.rows.length > 0) {
      res.status(409).send("⚠ Conflict! Customer already registered...");
      return;
    }

    res.locals.name = nameStrip;
    res.locals.cpf = cpfStrip;
    res.locals.phone = phoneStrip;

    next();
  } catch (err) {
    console.error("⚠ Error validating customer data input!", err);
    res.status(422).send("⚠ Error validating customer data input!");
  }
}
