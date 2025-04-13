import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceDataService } from '../../services/invoice-data.service';
import { PdfGeneratorService } from '../../services/pdf-generator.service';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  invoiceData: any;

  constructor(
    private invoiceService: InvoiceDataService,
    private pdfService: PdfGeneratorService
  ) {}

  ngOnInit(): void {
    // Get all the details from the InvoiceDataService
    this.invoiceData = this.invoiceService.getAllDetails();
    console.log('Invoice Data:', this.invoiceData);
  }

  // Method to generate the invoice preview PDF
  generatePreview(): void {
    this.pdfService.generateInvoicePreview();
  }

  // Method to download the invoice as a PDF
  downloadPdf(): void {
    this.pdfService.downloadInvoicePDF();
  }
}
