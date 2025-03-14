import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

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
  businessForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.businessForm = this.fb.group({
      name: [''],
      streetAddress: [''],
      city: [''],
      country: [''],
      email: ['', [Validators.email]],
      phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
    });
  }

  resetForm() {
    this.businessForm.reset();
  }

  getFormData() {
    return this.businessForm.value;
  }
}
