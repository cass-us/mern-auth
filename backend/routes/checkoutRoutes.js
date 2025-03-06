import express from "express";
import {
    createCheckout,
    updateCheckout,
    finalizeCheckout
} from "../controllers/checkoutController.js"; 
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/", protect, createCheckout);


router.put("/:id", protect, updateCheckout);


router.post("/:id/finalize", protect, finalizeCheckout);

export default router;
