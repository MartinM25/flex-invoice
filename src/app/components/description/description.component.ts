import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './description.component.html',
  styleUrl: './description.component.css'
})
export class DescriptionComponent implements OnInit {
  descriptionForm!: FormGroup;
  displayedColumns: string[] = ['description', 'rate', 'quantity', 'total'];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.descriptionForm = this.fb.group({
      rows: this.fb.array([this.createRow()]), // Initialize with one row
    });
  }

  get rows(): FormArray {
    return this.descriptionForm.get('rows') as FormArray;
  }

  createRow(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      rate: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      total: [{ value: 0, disabled: true }],
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
  }

  getRowGroup(index: number): FormGroup {
    return this.rows.at(index) as FormGroup;
  }

  onSubmit(): void {
    console.log(this.descriptionForm.value);
  }

  removeRow(index: number): void {
    const rows = this.descriptionForm.get('rows') as FormArray;
    rows.removeAt(index);
  }
  
}
