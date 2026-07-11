import express from 'express';
import {
  test,
  updateUser,
  deleteUser,
  getUserListings,
  getUser,
  toggleWishlist,
  getWishlist,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);

router.post('/update/:id', verifyToken, updateUser);

router.delete('/delete/:id', verifyToken, deleteUser);

router.get('/listings/:id', verifyToken, getUserListings);

router.post('/wishlist/:listingId', verifyToken, toggleWishlist);

router.get('/wishlist/:id', verifyToken, getWishlist);

// IMPORTANT: Keep this route LAST
router.get('/:id', verifyToken, getUser);

export default router;