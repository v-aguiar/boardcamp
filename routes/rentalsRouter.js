import { Router } from "express";

import {
  addRental,
  closeRental,
  deleteRental,
  fetchRentals,
} from "../controllers/rentalsController.js";

import {
  validateAddRental,
  validateIdParamRental,
} from "../middlewares/rentalsMiddleware.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", fetchRentals);
rentalsRouter.post("/rentals", validateAddRental, addRental);
rentalsRouter.post("/rentals/:id/return", validateIdParamRental, closeRental);
rentalsRouter.delete("/rentals/:id", validateIdParamRental, deleteRental);

export default rentalsRouter;
