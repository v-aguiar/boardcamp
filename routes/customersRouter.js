import { Router } from "express";

import {
  addCustomer,
  updateCustomer,
  fetchCustomers,
  fetchCustomerById,
} from "../controllers/customersController.js";
import { validateAddCustomer } from "../middlewares/customersMiddleware.js";

const customersRouter = Router();

customersRouter.get("/customers", fetchCustomers);
customersRouter.get("/customers/:id", fetchCustomerById);
customersRouter.post("/customers", validateAddCustomer, addCustomer);
customersRouter.put("/customers/:id", validateAddCustomer, updateCustomer);

export default customersRouter;
