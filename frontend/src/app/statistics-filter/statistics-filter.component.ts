import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface FilterData {
  restaurantId: number;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-statistics-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './statistics-filter.component.html',
  styleUrl: './statistics-filter.component.css'
})
export class StatisticsFilterComponent implements OnInit {
  @Output() filterApplied = new EventEmitter<FilterData>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      restaurantId: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.form.patchValue({
      restaurantId: 201216,
      startDate: '2020-01-01',
      endDate: new Date().toISOString().split('T')[0]
    });
    if (this.form.valid) {
      this.filterApplied.emit(this.form.value);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.filterApplied.emit(this.form.value);
    }
  }
}
