import express from "express";
import { addCustomer, getCustomer } from "../controller/customerController.js";
import userAuth from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/add", userAuth, addCustomer);
router.get("/:id", getCustomer);

export default router;
