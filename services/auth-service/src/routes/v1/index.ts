import { Router } from 'express';
import {
  register,
  login,
  logout,
  refresh,
  profile,
  verify,
  listUsers,
} from '../../controllers/user.controller';
import {
  protect,
  admin,
  validateRegister,
  validateLogin,
} from '../../middlewares';

const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.post('/verify', verify);
router.get('/profile', protect, profile);
router.get('/users', protect, admin, listUsers);

export default router;
