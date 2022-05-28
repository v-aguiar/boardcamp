import db from "../db/db.js";

export async function fetchCategories(req, res) {
  try {
    const categoriesDb = await db.query(`SELECT * FROM categories`);
    const categories = categoriesDb.rows;

    res.status(200).send(categories);
  } catch (err) {
    console.error("⚠ Could not fetch categories!", err);
    // TODO check status code for this get
    res.status(400).send("⚠ Could not fetch categories!");
  }
}

export async function addCategory(req, res) {
  const { name } = res.locals;

  try {
    await db.query(`INSERT INTO categories (name) VALUES ($1)`, [name]);

    res.sendStatus(201);
  } catch (err) {
    console.error("⚠ Could not add category! ", err);
    res.status(422).send("⚠ Could not add category!");
  }
}