import { Router } from 'express';
import { login, status, logout, register } from '../controllers/user';
import { sessionValidation } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/status', sessionValidation, status);
router.post('/logout', sessionValidation, logout);

export default router;
