import express from 'express';
import { 
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getProductById
    , newArrival
} from '../controllers/productController.js'; 
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, admin, createProduct);

router.get('/', getProducts);

router.get('/newArrival', newArrival);

router.get('/:id', getProductById);

router.put('/:id', protect, admin, updateProduct);

router.delete('/:id', protect, admin, deleteProduct);

export default router;
