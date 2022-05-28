import { Router } from "express";

import { fetchCustomers } from "../controllers/customersController.js";

const customersRouter = Router();

customersRouter.get("/customers", fetchCustomers);
// customersRouter.get("/customers/:id", fetchCustomerById);
// customersRouter.post("/customers", validateAddCustomer, addCustomer);

export default customersRouter;
