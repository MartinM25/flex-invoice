import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { PdfGeneratorService } from './services/pdf-generator.service';
import { SafeResourceUrl } from '@angular/platform-browser';

import { PreviewComponent } from './components/preview/preview.component';
import { TotalComponent } from './components/total/total.component';
import { BillToComponent } from './components/bill-to/bill-to.component';
import { HeadingComponent } from './components/heading/heading.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
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
    MainHeaderComponent,
    MatFormFieldModule,
    HeadingComponent,
    PreviewComponent,
    MatSelectModule,
    BillToComponent,
    TotalComponent,
    MatIconModule,
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
    private pdfService: PdfGeneratorService,
  ) {}

  onClear() {
    console.log('Button clicked!');
  };

  onDone() {
    this.showPreview = true;
    this.generatePreview();
  }

  goBack() {
    this.showPreview = false;
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
