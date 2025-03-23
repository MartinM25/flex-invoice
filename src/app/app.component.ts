import { Component } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BillToComponent } from './components/bill-to/bill-to.component';
import { HeadingComponent } from './components/heading/heading.component';
import { DescriptionComponent } from './components/description/description.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { BankingDetailsComponent } from './components/banking-details/banking-details.component';
import { BusinessDetailsComponent } from './components/business-details/business-details.component';
import { TotalComponent } from './components/total/total.component';

import { InvoiceDataService } from './services/invoice-data.service';

interface Currency {
  value: string
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BusinessDetailsComponent,
    BankingDetailsComponent,
    CustomButtonComponent,
    MatFormFieldModule,
    HeadingComponent,
    MatSelectModule,
    BillToComponent,
    DescriptionComponent,
    TotalComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'flex-invoice';

  constructor(private invoiceService: InvoiceDataService) {}

  currencies: Currency[] = [
    {value: 'ZAR'},
    {value: 'USD'},
    {value: 'ZiG'},
  ];

  onClear() {
    console.log('Button clicked!');
  };

  onDone() {
    const allDetails = this.invoiceService.getAllDetails();
    console.log('Saved Invoice Details:', allDetails);
  }
}
