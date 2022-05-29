export default function setFetchRentalsQuery(customerId = 0, gameId = 0) {
  if (customerId !== 0 && gameId !== 0) {
    return `SELECT r.*, to_json (c) as customer, to_json (g) as game
        FROM rentals r
        JOIN customers c
        ON c.id = $1 AND r."customerId" = c.id
        JOIN games g
        ON g.id = $2 AND r."gameId" = g.id
      `;
  } else if (customerId !== 0) {
    return `SELECT r.*, to_json (c) as customer, to_json (g) as game
        FROM rentals r
        JOIN customers c
        ON c.id = $1 AND r."customerId" = c.id
        JOIN games g
        ON r."gameId" = g.id
      `;
  } else if (gameId !== 0) {
    return `SELECT r.*, to_json (c) as customer, to_json (g) as game
        FROM rentals r
        JOIN customers c
        ON r."customerId" = c.id
        JOIN games g
        ON g.id = $1 AND r."gameId" = g.id
      `;
  } else {
    return `SELECT r.*, to_json (c) as customer, to_json (g) as game
        FROM rentals r
        JOIN customers c
        ON r."customerId" = c.id
        JOIN games g
        ON r."gameId" = g.id
      `;
  }
}
