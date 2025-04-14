import { Injectable } from '@angular/core';
import { InvoiceDataService } from './invoice-data.service';

import type { TDocumentDefinitions } from 'pdfmake/interfaces';

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

  // async downloadInvoicePDF(): Promise<void> {
  //   const invoiceElement = document.getElementById('invoice-preview');

  //   if (!invoiceElement) {
  //     console.error('Invoice preview element not found.');
  //     return;
  //   }

  //   const canvas = await html2canvas(invoiceElement, { scale: 2 });
  //   const imageData = canvas.toDataURL('image/png');

  //   const docDefinition = {
  //     content: [
  //       {
  //         image: imageData,
  //         width: 500,
  //       },
  //     ],
  //   };

  //   pdfMake.createPdf(docDefinition).download('invoice.pdf');
  // }

  async downloadInvoicePDF(): Promise<void> {
    const invoiceData = this.invoiceService.getAllDetails(); // adjust as needed
  
    const docDefinition: TDocumentDefinitions = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      content: [
        {
          text: 'INVOICE',
          style: 'header'
        },
        {
          columns: [
            {
              text: `Invoice No: ${invoiceData.business?.invoiceNumber || ''}`,
              alignment: 'right',
              style: 'subheader'
            }
          ]
        },
        {
          text: invoiceData.business?.companyName || '',
          style: 'companyName'
        },
        {
          text: [
            `${invoiceData.business?.companyStreet || ''}, ${invoiceData.business?.companyCity || ''}, ${invoiceData.business?.companyCountry || ''}\n`,
            `${invoiceData.business?.companyEmail || ''}\n`,
            `${invoiceData.business?.companyPhone || ''}`
          ],
          style: 'normal'
        },
        {
          text: `\nInvoice Date: ${new Date(invoiceData.business?.invoiceDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          })}`,
          style: 'normal'
        },
        {
          text: '\nBill To:',
          style: 'subheader'
        },
        {
          text: [
            `${invoiceData.client?.name || ''}\n`,
            `${invoiceData.client?.phone || ''}\n`,
            `${invoiceData.client?.streetAddress || ''}`
          ],
          style: 'normal'
        },
        {
          text: '\nInvoice Items',
          style: 'subheader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Description', 'Rate', 'Qty', 'Total'],
              ...invoiceData.items.map((item: any) => [
                item.description,
                item.rate,
                item.quantity,
                item.total
              ])
            ]
          },
          layout: 'lightHorizontalLines'
        },
        {
          columns: [
            { width: '*', text: '' },
            {
              width: 'auto',
              text: `Total: ${invoiceData.total || 0}`,
              style: 'total'
            }
          ]
        },
        {
          text: '\nBanking Details',
          style: 'subheader'
        },
        {
          text: [
            `${invoiceData.banking?.bankName || ''}\n`,
            `${invoiceData.banking?.accountNumber || ''}`
          ],
          style: 'normal'
        },
        {
          text: '\n\nThank you for working with us.',
          style: 'thankYou'
        }
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 4]
        },
        companyName: {
          fontSize: 18,
          color: '#4CAF50',
          bold: true,
          margin: [0, 10, 0, 6]
        },
        normal: {
          fontSize: 11,
          margin: [0, 0, 0, 2]
        },
        total: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 0]
        },
        thankYou: {
          fontSize: 12,
          italics: true,
          alignment: 'center',
          margin: [0, 30, 0, 0]
        }
      }
    };
  
    pdfMake.createPdf(docDefinition).download(`invoice-${invoiceData.business?.invoiceNumber || 'preview'}.pdf`);
  }
  
}
