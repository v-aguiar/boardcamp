import db from "../db/db.js";

export async function fetchCustomers(req, res) {
  const cpf = req.query.cpf ? req.query.cpf : "";

  const query = cpf
    ? `SELECT * FROM customers WHERE cpf LIKE '%${cpf}%'`
    : `SELECT * FROM customers`;

  try {
    const customersDb = await db.query(query);
    const customers = customersDb.rows;

    res.status(200).send(customers);
  } catch (err) {
    console.error("⚠ Could not fetch customers!", err);
    // TODO check status code for this get
    res.status(400).send("⚠ Could not fetch customers!");
  }
}
