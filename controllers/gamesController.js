import db from "../db/db.js";

export async function fetchGames(req, res) {
  const name = req.query.name ? req.query.name : "";

  const query = `SELECT * FROM games WHERE name LIKE '%${name}%'`;

  try {
    const gamesDb = await db.query(query);
    const games = gamesDb.rows;

    res.status(200).send(games);
  } catch (err) {
    console.error("⚠ Could not fetch games!", err);
    // TODO check status code for this get
    res.status(400).send("⚠ Could not fetch games!");
  }
}

export async function addGame(req, res) {
  try {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    const query = 
    `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
      VALUES ($1, $2, $3, $4, $5)
    `;
    const dependencies = [name, image, stockTotal, categoryId, pricePerDay];

    await db.query(query, dependencies);

    res.status(201).send("🎉 Success!");
  } catch (err) {
    console.error("⚠ Could not add game! ", err);
    res.status(422).send("⚠ Could not add game!");
  }
}

