import { Router } from 'express';
import {
  getGuides,
  createGuide,
  deleteGuide,
  updateGuide,
  getGuide,
} from '../controllers/guide';
import { sessionValidation } from '../middleware/auth';

const router = Router();

router.get('/', getGuides);
router.get('/:guideId', getGuide);
router.post('/', sessionValidation, createGuide);
router.put('/:guideId', sessionValidation, updateGuide);
router.delete('/:guideId', sessionValidation, deleteGuide);

export default router;
