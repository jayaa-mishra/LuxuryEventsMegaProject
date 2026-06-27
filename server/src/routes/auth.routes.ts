import express from 'express';
import {
  authUserController,
  registerUserController,
  logoutUserController,
  getUserProfileController,
} from '../controllers/auth.controller';
import { protect, admin } from '../middlewares/auth.middleware';
import { registerValidator, loginValidator } from '../middlewares/auth.validator';
import { validateRequest } from '../middlewares/validate.middleware';

const router = express.Router();

router.post('/register', protect, admin, registerValidator, validateRequest, registerUserController);
router.post('/login', loginValidator, validateRequest, authUserController);
router.post('/logout', logoutUserController);
router.route('/profile').get(protect, getUserProfileController);

export default router;
