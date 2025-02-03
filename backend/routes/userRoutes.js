import express from 'express';
import {  
    authUser,
    registerUser
    ,updateProfile
    ,getUserProfile,
    logoutUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/auth',authUser);
router.post('/',registerUser);

router.route('/profile').get(protect,getUserProfile).put(protect,updateProfile);
router.post('/logout',logoutUser)

export default router;