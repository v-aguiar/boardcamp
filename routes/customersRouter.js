import { Router } from "express";

import {
  fetchCustomers,
  fetchCustomerById,
} from "../controllers/customersController.js";

const customersRouter = Router();

customersRouter.get("/customers", fetchCustomers);
customersRouter.get("/customers/:id", fetchCustomerById);
// customersRouter.post("/customers", validateAddCustomer, addCustomer);

export default customersRouter;
