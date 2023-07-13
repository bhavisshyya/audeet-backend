import express from "express";
import { addSupplier, getSupplier } from "../controller/supplierController.js";
import userAuth from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/add", userAuth, addSupplier);
router.get("/:id", getSupplier);

export default router;
