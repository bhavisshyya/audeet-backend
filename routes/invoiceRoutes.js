import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { generateInvoice } from "../controller/invoiceController.js";
const router = express.Router();

router.post("/create-invoice", userAuth, generateInvoice);
// router.get("/:id",userAuth,getInvoice);

export default router;
