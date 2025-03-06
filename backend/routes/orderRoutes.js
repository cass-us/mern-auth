import express from "express";
import { getOrders, getOrder } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js"; 
const router = express.Router();

)
router.get("/", protect, getOrders);


router.get("/:id", protect, getOrder);

export default router;
