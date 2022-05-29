import db from "../db/db.js";
import rental_schema from "../schemas/rental_schema.js";

export async function validateAddRental(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;

  const validateRentalData = rental_schema.validate({
    customerId,
    gameId,
    daysRented,
  });
  if (validateRentalData.error) {
    console.error("⚠ Validation error! ", validateRentalData.error.message);
    res.status(400).json({ error: validateRentalData.error.message });
    return;
  }

  try {
    // Check if customerId belongs to a registered customer
    const customerDb = await db.query(`SELECT * FROM customers WHERE id = $1`, [
      customerId,
    ]);
    const customer = customerDb.rows[0];

    if (!customer) {
      console.error("⚠ Bad request! No customer found with given id...");
      res.status(400).send("⚠ Bad request! No customer found with given id...");
      return;
    }

    // Check if gameId belongs to a registered game
    const gameDb = await db.query(
      `SELECT * 
        FROM games 
        WHERE id = $1
      `,
      [gameId]
    );
    const game = gameDb.rows[0];

    if (!game) {
      console.error("⚠ Bad request! No game found with given id...");
      res.status(400).send("⚠ Bad request! No game found with given id...");
      return;
    }

    // Check if game is out of stock
    const alreadyRentedDb = await db.query(
      `SELECT * FROM rentals WHERE "gameId" = $1`,
      [gameId]
    );
    const alreadyRentedLength = alreadyRentedDb.rows.length;

    console.log(alreadyRentedLength);
    console.log(alreadyRentedDb.rows);

    if (alreadyRentedLength >= game.stockTotal) {
      console.error("⚠ Bad request! Out of stock...");
      res.status(400).send("⚠ Bad request! Out of stock...");
      return;
    }

    next();
  } catch (err) {
    console.error("⚠ Error validating rental data input!", err);
    res.status(422).send("⚠ Error validating rental data input!");
  }
}
