import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartData, ChartType, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
import { ReservationService } from '../reservation.service';
import { StatisticsFilterComponent, FilterData } from '../statistics-filter/statistics-filter.component';

Chart.register(CategoryScale, LinearScale, BarController, BarElement);

@Component({
  selector: 'app-statistics-status',
  standalone: true,
  imports: [CommonModule, RouterLink, BaseChartDirective, StatisticsFilterComponent],
  templateUrl: './statistics-status.component.html',
  styleUrls: ['./statistics-status.component.css']
})
export class StatisticsStatusComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  statusCounts: { status: string; count: number }[] = [];

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        type: 'category'
      },
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
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { 
        data: [], 
        label: 'Count',
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1
      }
    ]
  };

  constructor(private reservationService: ReservationService) {}

  onFilterApplied(filterData: FilterData): void {
    const { restaurantId, startDate, endDate } = filterData;
    this.reservationService.getStatistics(restaurantId, startDate, endDate).subscribe({
      next: (data) => {
        this.statusCounts = data.statusCounts;
        this.updateChart();
      },
      error: (error) => {
        console.error('Error fetching status statistics:', error);
      }
    });
  }

  private updateChart(): void {
    const colors = [
      'rgba(255, 99, 132, 0.7)',
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(153, 102, 255, 0.7)',
      'rgba(255, 159, 64, 0.7)'
    ];
    this.barChartData = {
      labels: this.statusCounts.map(s => s.status),
      datasets: [
        {
          data: this.statusCounts.map(s => s.count),
          label: 'Count',
          backgroundColor: this.statusCounts.map((_, index) => colors[index % colors.length]),
          borderColor: this.statusCounts.map((_, index) => colors[index % colors.length].replace('0.7', '1')),
          borderWidth: 1
        }
      ]
    };
  }
}
