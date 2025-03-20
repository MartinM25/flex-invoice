import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InvoiceDataService } from '../../services/invoice-data.service';
import { CommonModule } from '@angular/common';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-bill-to',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './bill-to.component.html',
  styleUrl: './bill-to.component.css'
})
export class BillToComponent implements OnInit {
  clientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceDataService
  ) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      name: [''],
      streetAddress: [''],
      city: [''],
      country: [''],
      email: ['', [Validators.email]],
      phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
    });

    this.invoiceService.clientDetails$.subscribe(data => {
      if (data) this.clientForm.patchValue(data, { emitEvent: false });
    });

    this.clientForm.valueChanges.pipe(
      distinctUntilChanged() // Ensures only actual changes trigger updates
    ).subscribe(() => {
      this.saveClientDetails();
    });
  }

  resetForm() {
    this.clientForm.reset();
  }


  saveClientDetails() {
    this.invoiceService.updateClientDetails(this.clientForm.value);
  }
}
