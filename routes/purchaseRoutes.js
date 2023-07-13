import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
   createPurchase,
   getAllPurchase,
   getSinglePurchase,
} from "../controller/purchaseController.js";
const router = express.Router();

router.post("/create-purchase", userAuth, createPurchase);
router.get("/all", userAuth, getAllPurchase);
router.get("/:id", userAuth, getSinglePurchase);

export default router;
