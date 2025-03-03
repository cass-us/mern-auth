import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';

const router = express.Router();

router.post('/add',protect, addToCart);
router.get('/retrieve',getCart);
router.delete('/', protect, removeFromCart);

export default router;
