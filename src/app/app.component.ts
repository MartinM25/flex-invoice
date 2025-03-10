import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BillToComponent } from './components/bill-to/bill-to.component';
import { HeadingComponent } from './components/heading/heading.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { BusinessDetailsComponent } from './components/business-details/business-details.component';

interface Currency {
  value: string
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    BusinessDetailsComponent,
    CustomButtonComponent,
    MatFormFieldModule,
    HeadingComponent,
    MatSelectModule,
    BillToComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'flex-invoice';

  currencies: Currency[] = [
    {value: 'ZAR'},
    {value: 'USD'},
    {value: 'ZiG'},
  ];

  onClear() {
    console.log('Button clicked!');
  };

  onDone() {
    console.log('Button clicked!');
  }
}
