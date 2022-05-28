import { stripHtml } from "string-strip-html";

import db from "../db/db.js";

import games_schema from "../schemas/games_schema.js";

export async function validateAddGame(req, res, next) {
  

  const validateGameData = games_schema.validate({}, {abortEarly: false});
  if (validateGameData.error) {
    console.error("⚠ Validation error! ", validateGameData.error);
    res.sendStatus(400);
    return;
  }

  try {
    const sameGame = await db.query(
      `SELECT * FROM games WHERE name = $1`,
      []
    );

    if (sameGame.rows.length > 0) {
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
