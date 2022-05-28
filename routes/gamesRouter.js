import { Router } from "express";

const gamesRouter = Router();

gamesRouter.get("/games", fetchGames);
gamesRouter.post("/games", addGame);

export default gamesRouter;
