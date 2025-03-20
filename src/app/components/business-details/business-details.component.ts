import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { InvoiceDataService } from '../../services/invoice-data.service';
import { CommonModule } from '@angular/common';
import { distinctUntilChanged } from 'rxjs';

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

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceDataService
  ) {}

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
    
    this.invoiceService.businessDetails$.subscribe(data => {
      if (data) this.businessForm.patchValue(data, { emitEvent: false });
    });

    this.businessForm.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(() => {
      this.saveBusinessDetails();
    });
  }

  resetForm() {
    this.businessForm.reset();
  }

  saveBusinessDetails() {
    this.invoiceService.updateBusinessDetails(this.businessForm.value);
  }

}
