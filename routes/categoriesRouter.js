import { Router } from "express";

import {
  addCategory,
  fetchCategories,
} from "../controllers/categoriesController.js";
import {validateAddCategory} from "../middlewares/categoriesMiddleware.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", fetchCategories);
categoriesRouter.post("/categories", validateAddCategory, addCategory);

export default categoriesRouter;
