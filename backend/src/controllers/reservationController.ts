import { Request, Response } from 'express';
import { ReservationService } from '../services/reservationService';

const service = new ReservationService();

export class ReservationController {
  async getStatistics(req: Request, res: Response) {
    const { restaurantId, startDate, endDate } = req.query;

    if (!restaurantId || !startDate || !endDate) {
      return res.status(400).json({ error: 'Missing required parameters: restaurantId, startDate, endDate' });
    }

    try {
      const result = await service.getStatistics(parseInt(restaurantId as string), startDate as string, endDate as string);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
