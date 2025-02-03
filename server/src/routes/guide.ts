import { Router } from 'express';
import {
  getGuides,
  getMyGuides,
  getFavouriteGuides,
  createGuide,
  deleteGuide,
  updateGuide,
  getGuide,
} from '../controllers/guide';
import { sessionValidation } from '../middleware/auth';

const router = Router();

router.get('/', getGuides);
router.post('/', sessionValidation, createGuide);
router.get('/my', sessionValidation, getMyGuides);
router.get('/favourites', sessionValidation, getFavouriteGuides);
router.get('/:guideId', getGuide);
router.put('/:guideId', sessionValidation, updateGuide);
router.delete('/:guideId', sessionValidation, deleteGuide);

export default router;
