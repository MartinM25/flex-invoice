import { Injectable } from '@angular/core';
import { InvoiceDataService } from './invoice-data.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import html2canvas from 'html2canvas';

pdfMake.vfs = pdfFonts.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  constructor( private invoiceService: InvoiceDataService) {}

  async generateInvoicePreview(): Promise<void> {
    const invoiceElement = document.getElementById('invoice-preview');
    
    if (!invoiceElement) {
      console.error('Invoice preview element not found.');
      return;
    }

    const canvas = await html2canvas(invoiceElement, { scale: 2 });
    const imageData = canvas.toDataURL('image/png');

    const docDefinition = {
      content: [
        {
          image: imageData,
          width: 500, 
        },
      ],
    };

    pdfMake.createPdf(docDefinition).open();
  }

  async downloadInvoicePDF(): Promise<void> {
    const invoiceElement = document.getElementById('invoice-preview');

    if (!invoiceElement) {
      console.error('Invoice preview element not found.');
      return;
    }

    const canvas = await html2canvas(invoiceElement, { scale: 2 });
    const imageData = canvas.toDataURL('image/png');

    const docDefinition = {
      content: [
        {
          image: imageData,
          width: 500,
        },
      ],
    };

    pdfMake.createPdf(docDefinition).download('invoice.pdf');
  }
}
