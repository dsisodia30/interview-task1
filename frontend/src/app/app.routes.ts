import { Routes } from '@angular/router';
import { StatisticsOverviewComponent } from './statistics-overview/statistics-overview.component';
import { StatisticsStatusComponent } from './statistics-status/statistics-status.component';

export const routes: Routes = [
  { path: '', redirectTo: 'statistics', pathMatch: 'full' },
  { path: 'statistics', component: StatisticsOverviewComponent },
  { path: 'statistics/status', component: StatisticsStatusComponent }
];
