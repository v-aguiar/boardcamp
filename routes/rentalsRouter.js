import { Router } from "express";

import { fetchRentals } from "../controllers/rentalsController.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", fetchRentals);
// rentalsRouter.post("/rentals", addRent);
// rentalsRouter.post("/rentals/:id/return", closeRent);
// rentalsRouter.delete("/rentals/:id", deleteRent);

export default rentalsRouter;
