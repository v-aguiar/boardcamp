import { stripHtml } from "string-strip-html";

import db from "../db/db.js";

import games_schema from "../schemas/games_schema.js";

export async function validateAddGame(req, res, next) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  // Joi validation
  const validateGameData = games_schema.validate({
    name: typeof(name) === 'string' ? stripHtml(name).result : name,
    image: typeof(image) === 'string' ? stripHtml(image).result : image,
    stockTotal,
    categoryId,
    pricePerDay
  }, {abortEarly: false});

  if (validateGameData.error) {
    console.error("⚠ Validation error! ", validateGameData.error.message);
    res.status(400).json({ error: validateGameData.error.message });
    return;
  }

  try {
    // Check if game already exists
    const sameGame = await db.query(
      `SELECT * FROM games WHERE name = $1`, [stripHtml(name).result]);
    if (sameGame.rows.length > 0) {
      res.status(409).send("⚠ Conflict! Game already registered...");
      return;
    }

    // Check if categoryId matches any registered category
    const existingCategory = await db.query(
      `SELECT * FROM categories WHERE id = $1`, [categoryId]);
    if (existingCategory.rows.length === 0) {
      res.status(400).send("⚠ Bad request! Category does not exist...");
      return;
    }

  } catch (err) {
    console.error("⚠ Error validating game data input!", err);
    res.status(422).send("⚠ Error validating game data input!");
  }

  res.locals.name = name;
  next();
}
