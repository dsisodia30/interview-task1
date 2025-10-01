import { Router } from 'express';
import { ReservationController } from '../controllers/reservationController';

const router = Router();
const controller = new ReservationController();

router.get('/statistics', controller.getStatistics.bind(controller));

export default router;
