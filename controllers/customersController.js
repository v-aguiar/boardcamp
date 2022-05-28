import db from "../db/db.js";

export async function fetchCustomers(req, res) {
  const cpf = req.query.cpf ? req.query.cpf : "";

  const query = cpf
    ? `SELECT * FROM customers WHERE cpf LIKE '${cpf}%'`
    : `SELECT * FROM customers`;

  try {
    const customersDb = await db.query(query);
    const customers = customersDb.rows;

    res.status(200).send(customers);
  } catch (err) {
    console.error("⚠ Could not fetch customers!", err);
    res.status(400).send("⚠ Could not fetch customers!");
  }
}

export async function fetchCustomerById(req, res) {
  const { id } = req.params;

  try {
    const customerDb = await db.query(
      `SELECT * FROM customers WHERE id = ${id}`
    );
    const customer = customerDb.rows[0];

    if (!customer) {
      res.status(404).send("⚠ Not found! No customer found with given id...");
      return;
    }

    res.status(200).send(customer);
  } catch (err) {
    console.error("⚠ Could not fetch customer!", err);
    res.status(400).send("⚠ Could not fetch customer...");
  }
}
