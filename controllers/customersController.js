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

export async function addCustomer(req, res) {
  const { birthday } = req.body;
  const { name, cpf, phone } = res.locals;

  const query = `INSERT INTO customers 
    (name, cpf, phone, birthday)
    VALUES ($1, $2, $3, $4)`;
  const values = [name, cpf, phone, birthday];

  try {
    await db.query(query, values);

    res.sendStatus(201);
  } catch (err) {
    console.error("⚠ Could not add customer!", err);
    res.status(400).send("⚠ Could not add customer...");
  }
}

export async function updateCustomer(req, res) {
  const { id } = req.params;
  const { birthday } = req.body;
  const { name, cpf, phone } = res.locals;

  const query = `UPDATE customers
    SET name = $1, cpf = $2, phone = $3, birthday = $4
    WHERE id = $5`;
  const values = [name, cpf, phone, birthday, id];

  try {
    await db.query(query, values);

    res.sendStatus(200);
  } catch (err) {
    console.error("⚠ Could not update customer!", err);
    res.status(400).send("⚠ Could not update customer...");
  }
}
