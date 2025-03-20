import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
// import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { InvoiceDataService } from '../../services/invoice-data.service';
import { Subscription, distinctUntilChanged } from 'rxjs';


@Component({
  selector: 'app-description',
  standalone: true,
  imports: [
    // MatTableModule,
    CommonModule,
    // MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './description.component.html',
  styleUrl: './description.component.css'
})
export class DescriptionComponent implements OnInit {
  descriptionForm!: FormGroup;
  displayedColumns: string[] = ['description', 'rate', 'quantity', 'total'];
  private subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceDataService
  ) { }

  ngOnInit(): void {
    this.descriptionForm = this.fb.group({
      rows: this.fb.array([]),
    });

    this.subscription = this.invoiceService.invoiceItems$
    .pipe(distinctUntilChanged())
    .subscribe(items => {
      if (this.rows.length === 0 && items.length > 0) {
        items.forEach(item => this.rows.push(this.createRow(item)));
      } else if (this.rows.length === 0) {
        this.rows.push(this.createRow());
      }
    });

    this.descriptionForm.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
      this.invoiceService.updateInvoiceItems(this.rows.value);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get rows(): FormArray {
    return this.descriptionForm.get('rows') as FormArray;
  }

  createRow(data: any = {}): FormGroup {
    return this.fb.group({
      description: [data.description || '', Validators.required],
      rate: [data.rate || 0, [Validators.required, Validators.min(0)]],
      quantity: [data.quantity || 0, [Validators.required, Validators.min(0)]],
      total: [{ value: data.total || 0, disabled: true }],
    });
  }

  addRow(): void {
    this.rows.push(this.createRow());
    this.descriptionForm.markAsDirty();
    this.descriptionForm.markAsTouched();
  }

  calculateTotal(index: number): void {
    const row = this.rows.at(index);
    const rate = row.get('rate')?.value ?? 0;
    const quantity = row.get('quantity')?.value ?? 0;
    const total = rate * quantity;
    row.get('total')?.setValue(total, { emitEvent: false });

    this.invoiceService.updateInvoiceItems(this.rows.value);
  }

  getRowGroup(index: number): FormGroup {
    return this.rows.at(index) as FormGroup;
  }

  removeRow(index: number): void {
    this.rows.removeAt(index);
    this.invoiceService.updateInvoiceItems(this.rows.value);
  }
  
}
