export default function setFetchRentalsValues(customerId = 0, gameId = 0) {
  if (customerId !== 0 && gameId !== 0) {
    return [customerId, gameId];
  } else if (customerId !== 0) {
    return [customerId];
  } else if (gameId !== 0) {
    return [gameId];
  } else {
    return [];
  }
}
