import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InvoiceDataService } from '../../services/invoice-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-total',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './total.component.html',
  styleUrl: './total.component.css'
})
export class TotalComponent implements OnInit, OnDestroy {
  subtotal: FormControl<number | null> = new FormControl(0);
  amountPaid: FormControl<number | null> = new FormControl(0);
  amountDue: FormControl<number | null> = new FormControl(0);

  private subtotalSubscription!: Subscription;

  constructor(private invoiceService: InvoiceDataService) {}

  ngOnInit(): void {
    // Listen for invoice items and update subtotal
    this.subtotalSubscription = this.invoiceService.subtotal$.subscribe(
      (subtotal) => {
        this.subtotal.setValue(subtotal);
        this.updateAmountDue(); // Recalculate amount due whenever subtotal changes
      }
    );

    // Update Amount Due when Amount Paid changes
    this.amountPaid.valueChanges.subscribe(() => this.updateAmountDue());
  }

  updateAmountDue(): void {
    const subtotalValue = this.subtotal.value ?? 0;  // Default to 0 if null
    const amountPaidValue = this.amountPaid.value ?? 0;  // Default to 0 if null
    this.amountDue.setValue(subtotalValue - amountPaidValue);
  }

  ngOnDestroy(): void {
    this.subtotalSubscription.unsubscribe();
  }

  onAmountPaidChange(event: Event): void {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.amountPaid.setValue(value);  // Set the value through FormControl
    this.updateAmountDue();
  }
}
