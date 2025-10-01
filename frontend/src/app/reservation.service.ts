import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Statistics {
  weekday: string;
  reservationCount: number;
  totalGroupSize: number;
}

export interface StatisticsResponse {
  weekdayStats: Statistics[];
  statusCounts: { status: string; count: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000/api/reservations';

  constructor(private http: HttpClient) { }

  getStatistics(restaurantId: number, startDate: string, endDate: string): Observable<StatisticsResponse> {
    const params = { restaurantId: restaurantId.toString(), startDate, endDate };
    return this.http.get<StatisticsResponse>(`${this.apiUrl}/statistics`, { params });
  }
}
