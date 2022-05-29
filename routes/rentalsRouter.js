import { Router } from "express";

import { addRental, fetchRentals } from "../controllers/rentalsController.js";
import { validateAddRental } from "../middlewares/rentalsMiddleware.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", fetchRentals);
rentalsRouter.post("/rentals", validateAddRental, addRental);
// rentalsRouter.post("/rentals/:id/return", closeRent);
// rentalsRouter.delete("/rentals/:id", deleteRent);

export default rentalsRouter;
