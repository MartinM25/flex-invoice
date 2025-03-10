import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-business-details',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
  ],
  templateUrl: './business-details.component.html',
  styleUrl: './business-details.component.css'
})
export class BusinessDetailsComponent implements OnInit {
  businessForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.businessForm = this.fb.group({
      companyName: [''],
      companyStreet: [''],
      companyCity: [''],
      companyCountry: [''],
      companyEmail: ['', [Validators.email]],
      companyPhone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
      invoiceNumber: [''],
      currency: [''],
      invoiceDate: [''],
    });
  }

  resetForm() {
    this.businessForm.reset();
  }

  getFormData() {
    return this.businessForm.value;
  }

}
