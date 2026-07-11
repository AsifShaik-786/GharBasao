import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createVisit,
  getOwnerVisits,
  updateVisitStatus,
} from '../controllers/visit.controller.js';

const router = express.Router();

router.post('/create/:listingId', verifyToken, createVisit);

router.get('/owner', verifyToken, getOwnerVisits);

router.patch(
  '/status/:visitId',
  verifyToken,
  updateVisitStatus
);

export default router;