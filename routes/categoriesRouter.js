import { Router } from "express";
import { addCategory, fetchCategories } from "../controllers/categoriesController.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", fetchCategories);
categoriesRouter.post("/categories", addCategory);

export default categoriesRouter;
