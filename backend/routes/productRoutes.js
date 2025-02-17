import express from 'express';
import { 
    createProduct,
    // getProducts,
    updateProduct,
    deleteProduct,
    getProductById
} from '../controllers/productController.js'; // Import controller functions


const router = express.Router();

// Route to create a product
router.post('/', createProduct);

// Route to get all products
// router.get('/', getProduct);

// Route to get a specific product by ID
router.get('/:id', getProductById);

// Route to update a specific product by ID
router.put('/:id', updateProduct);

// Route to delete a product by ID
router.delete('/:id', deleteProduct);

export default router;
