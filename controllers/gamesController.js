import db from "../db/db.js";

export async function fetchGames(req, res) {
  try {
    const gamesDb = await db.query(`SELECT * FROM games`);
    const games = gamesDb.rows;

    res.status(200).send(games);
  } catch (err) {
    console.error("⚠ Could not fetch games!", err);
    // TODO check status code for this get
    res.status(400).send("⚠ Could not fetch games!");
  }
}

export async function addCategory(req, res) {
  try {


    res.sendStatus(201);
  } catch (err) {
    console.error("⚠ Could not add game! ", err);
    res.status(422).send("⚠ Could not add game!");
  }
}

