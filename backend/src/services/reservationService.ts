import { ReservationRepository } from '../repositories/reservationRepository';

const repository = new ReservationRepository();

const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export class ReservationService {
  async getStatistics(restaurantId: number, startDate: string, endDate: string) {
    const reservations = await repository.getReservations(restaurantId, startDate, endDate);

    const statsMap = new Map<number, { count: number; totalSize: number }>();

    reservations.forEach(reservation => {
      const date = new Date(reservation.reservedFor);
      const weekday = date.getDay(); // 0 = Sunday

      if (!statsMap.has(weekday)) {
        statsMap.set(weekday, { count: 0, totalSize: 0 });
      }

      const stat = statsMap.get(weekday)!;
      stat.count += 1;
      stat.totalSize += reservation.peopleCount;
    });

    // group reservations by status and get count for each status
    const statusMap = new Map<string, number>();
    reservations.forEach(reservation => {
      const status = reservation.status;
      statusMap.set(status, (statusMap.get(status) || 0) + 1);
    });

    // group reservations by weekday
    const weekdayStats = Array.from(statsMap.entries())
      .sort(([a], [b]) => a - b)
      .map(([weekday, { count, totalSize }]) => ({
        weekday: weekdayNames[weekday],
        reservationCount: count,
        totalGroupSize: totalSize
      }));

    const statusCounts = Array.from(statusMap.entries())
      .map(([status, count]) => ({
        status,
        count
      }));

    return {
      weekdayStats,
      statusCounts
    };
  }
}
