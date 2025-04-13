import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { InvoiceDataService } from './services/invoice-data.service';
import { PdfGeneratorService } from './services/pdf-generator.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { PreviewComponent } from './components/preview/preview.component';
import { TotalComponent } from './components/total/total.component';
import { BillToComponent } from './components/bill-to/bill-to.component';
import { HeadingComponent } from './components/heading/heading.component';
import { DescriptionComponent } from './components/description/description.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { BankingDetailsComponent } from './components/banking-details/banking-details.component';
import { BusinessDetailsComponent } from './components/business-details/business-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BusinessDetailsComponent,
    BankingDetailsComponent,
    CustomButtonComponent,
    DescriptionComponent,
    MatFormFieldModule,
    HeadingComponent,
    PreviewComponent,
    MatSelectModule,
    BillToComponent,
    TotalComponent,
    CommonModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'flex-invoice';

  showPreview = false;
  pdfSrc: SafeResourceUrl  | null = null;

  constructor(
    private invoiceService: InvoiceDataService,
    private pdfService: PdfGeneratorService,
    private sanitizer: DomSanitizer
  ) {}

  onClear() {
    console.log('Button clicked!');
  };

  onDone() {
    this.showPreview = true;
    this.generatePreview();
  }

  downloadPdf() {
    this.pdfService.downloadInvoicePDF();
  }

  goBack() {
    this.showPreview = false;
  }

  generatePreview(): void {
    // get all details from the Invoice  Service
    const invoiceData = this.invoiceService.getAllDetails();

    // Call the service to genarate the preview
    this.pdfService.generateInvoicePreview();
  }
}
