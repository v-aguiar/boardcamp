import db from "../db/db.js";

import setFetchRentalsQuery from "../utils/setFetchRentalsQuery.js";
import setFetchRentalsValues from "../utils/setFetchRentalsValues.js";

export async function fetchRentals(req, res) {
  const customerId = req.query.customerId ? req.query.customerId : undefined;
  const gameId = req.query.gameId ? req.query.gameId : undefined;

  const query = setFetchRentalsQuery(customerId, gameId);
  const values = setFetchRentalsValues(customerId, gameId);

  try {
    const rentalsDb = await db.query(query, values);
    const rentals = rentalsDb.rows;

    res.status(200).send(rentals);
  } catch (err) {
    console.error("⚠ Could not fetch rentals!", err);
    res.status(400).send("⚠ Could not fetch rentals...");
  }
}

export async function addRental(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    await db.query(
      `
        INSERT INTO 
        rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
        SELECT $1, $2, now(), $3, null, $3 * g."pricePerDay", null 
        FROM games g
        WHERE g.id = $2
      `,
      [customerId, gameId, daysRented]
    );

    res.sendStatus(201);
  } catch (err) {
    console.error("⚠ Could not add rental!", err);
    res.status(400).send("⚠ Could not add rental...");
  }
}

export async function closeRental(req, res) {
  const { id } = req.params;

  const query = `UPDATE rentals r
    SET "returnDate" = now(),
      "delayFee" = (
        SELECT EXTRACT(
          DAY FROM now() - r."rentDate"
        ) * g."pricePerDay"
      )
    FROM games g
    WHERE r.id = $1 AND g.id = r."gameId";
  `;
  const values = [id];

  try {
    await db.query(query, values);

    res.sendStatus(200);
  } catch (err) {
    console.error("⚠ Could not close rental!", err);
    res.status(400).send("⚠ Could not close rental...");
  }
}

export async function deleteRental(req, res) {
  const { id } = req.params;

  try {
    await db.query(
      `
        DELETE FROM rentals
        WHERE id = $1
      `,
      [id]
    );

    res.sendStatus(200);
  } catch (err) {
    console.error("⚠ Could not delete rental!", err);
    res.status(400).send("⚠ Could not delete rental...");
  }
}
