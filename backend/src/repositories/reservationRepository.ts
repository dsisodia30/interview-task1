import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ReservationRepository {
  async getReservations(restaurantId: number, startDate: string, endDate: string) {
    return await prisma.reservation.findMany({
      where: {
        betriebId: restaurantId,
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      select: {
        reservedFor: true,
        peopleCount: true,
        status: true
      }
    });
  }
}
