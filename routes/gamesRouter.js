import { Router } from "express";

import { fetchGames, addGame } from "../controllers/gamesController.js";
import { validateAddGame } from "../middlewares/gamesMiddleware.js";

const gamesRouter = Router();

gamesRouter.get("/games", fetchGames);
gamesRouter.post("/games", validateAddGame, addGame);

export default gamesRouter;
