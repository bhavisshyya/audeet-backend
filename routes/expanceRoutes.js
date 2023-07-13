import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
   createExpance,
   getAllExpance,
   getSingleExpance,
} from "../controller/expanceController.js";
const router = express.Router();

router.post("/create-expance", userAuth, createExpance);
router.get("/all", userAuth, getAllExpance);
router.get("/:id", userAuth, getSingleExpance);

export default router;
