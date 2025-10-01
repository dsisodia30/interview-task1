import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ReservationService, Statistics } from '../reservation.service';
import { StatisticsFilterComponent, FilterData } from '../statistics-filter/statistics-filter.component';

@Component({
  selector: 'app-statistics-overview',
  imports: [
    CommonModule,
    RouterLink,
    BaseChartDirective,
    StatisticsFilterComponent
  ],
  templateUrl: './statistics-overview.component.html',
  styleUrl: './statistics-overview.component.css'
})
export class StatisticsOverviewComponent {
  statistics: Statistics[] = [];
  statusCounts: { status: string; count: number }[] = [];

  public weekdayBarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public weekdayBarChartType: ChartType = 'bar';
  public weekdayBarChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Reservation Count', backgroundColor: 'rgba(75, 192, 192, 0.2)', borderColor: 'rgba(75, 192, 192, 1)', borderWidth: 1 },
      { data: [], label: 'Total Group Size', backgroundColor: 'rgba(255, 99, 132, 0.2)', borderColor: 'rgba(255, 99, 132, 1)', borderWidth: 1 }
    ]
  };

  public statusBarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  public statusBarChartType: ChartType = 'bar';
  public statusBarChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Count', backgroundColor: 'rgba(54, 162, 235, 0.2)', borderColor: 'rgba(54, 162, 235, 1)', borderWidth: 1 }
    ]
  };

  constructor(private reservationService: ReservationService) {}

  onFilterApplied(filterData: FilterData): void {
    const { restaurantId, startDate, endDate } = filterData;
    this.reservationService.getStatistics(restaurantId, startDate, endDate).subscribe({
      next: (data: any) => {
        this.statistics = data.weekdayStats;
        this.statusCounts = data.statusCounts;
        this.updateWeekdayChart();
        this.updateStatusChart();
      },
      error: (error) => {
        console.error('Error fetching statistics:', error);
      }
    });
  }

  private updateWeekdayChart(): void {
    this.weekdayBarChartData = {
      labels: this.statistics.map(s => s.weekday),
      datasets: [
        { ...this.weekdayBarChartData.datasets[0], data: this.statistics.map(s => s.reservationCount) },
        { ...this.weekdayBarChartData.datasets[1], data: this.statistics.map(s => s.totalGroupSize) }
      ]
    };
  }

  private updateStatusChart(): void {
    this.statusBarChartData = {
      labels: this.statusCounts.map(s => s.status),
      datasets: [
        { ...this.statusBarChartData.datasets[0], data: this.statusCounts.map(s => s.count) }
      ]
    };
  }
}
