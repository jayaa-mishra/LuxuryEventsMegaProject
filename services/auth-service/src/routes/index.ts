import { Router } from 'express';
import v1Routes from './v1';

const router = Router();

router.use('/v1/auth', v1Routes);

export default router;
