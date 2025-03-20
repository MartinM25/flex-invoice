import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InvoiceDataService } from '../../services/invoice-data.service';
import { CommonModule } from '@angular/common';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-banking-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './banking-details.component.html',
  styleUrl: './banking-details.component.css'
})
export class BankingDetailsComponent implements OnInit {
  bankingForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceDataService
  ) {}

  ngOnInit(): void {
    this.bankingForm = this.fb.group({
      bankName: [''],
      branchCode: [''],
      accountHolder: [''],
      accountNumber: [''],
    });

    this.invoiceService.bankingDetails$.subscribe(data => {
      if (data) this.bankingForm.patchValue(data, { emitEvent: false });
    });

    this.bankingForm.valueChanges.pipe(
      distinctUntilChanged() // Ensures only actual changes trigger updates
    ).subscribe(() => {
      this.saveBankingDetails();
    });
  }

  resetForm() {
    this.bankingForm.reset();
  }

  saveBankingDetails() {
    this.invoiceService.updateBankingDetails(this.bankingForm.value);
  }

}
