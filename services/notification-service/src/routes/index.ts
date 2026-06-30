import { Router } from 'express';
import { enqueue, stats } from '../controllers/notification.controller';

const router = Router();

router.post('/v1/notifications/enqueue', enqueue);
router.get('/v1/notifications/stats', stats);

export default router;
