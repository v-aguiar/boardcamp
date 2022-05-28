import { stripHtml } from "string-strip-html";

import db from "../db/db.js";

import category_schema from "../schemas/category_schema.js";

export async function validateAddCategory(req, res, next) {
  const { name } = req.body;

  const validateName = category_schema.validate({
    name: stripHtml(name).result,
  }, {abortEarly: false});
  if (validateName.error) {
    console.error("⚠ Validation error! ", validateName.error);
    res.status(400).send("⚠ Category name is required!");
    return;
  }

  try {
    const sameCategory = await db.query(
      `SELECT * FROM categories c WHERE c.name = $1`,
      [name]
    );

    if (sameCategory.rows.length > 0) {
      res.status(409).send("⚠ Conflict! Name already registered!");
      return;
    }
  } catch (err) {
    console.error("⚠ Error validating category name!", err);
    res.status(409).send("⚠ Error validating category name!");
  }

  res.locals.name = name;
  next();
}
