import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDataService {
  constructor() { }

  // Store business details
  private businessDetails = new BehaviorSubject<any>(null);
  businessDetails$ = this.businessDetails.asObservable();

  // Store client details
  private clientDetails = new BehaviorSubject<any>(null);
  clientDetails$ = this.clientDetails.asObservable();

  // Store banking details
  private bankingDetails = new BehaviorSubject<any>(null);
  bankingDetails$ = this.bankingDetails.asObservable();

  // Store invoice items
  private invoiceItems = new BehaviorSubject<any[]>([]);
  invoiceItems$ = this.invoiceItems.asObservable();

  // Methods to update data
  updateBusinessDetails(details: any) {
    this.businessDetails.next(details);
  }

  updateClientDetails(details: any) {
    this.clientDetails.next(details);
  }

  updateBankingDetails(details: any) {
    this.bankingDetails.next(details);
  }

  updateInvoiceItems(items: any[]) {
    this.invoiceItems.next(items);
  }

  getAllDetails() {
    return {
      business: this.businessDetails.getValue(),
      client: this.clientDetails.getValue(),
      banking: this.bankingDetails.getValue(),
      // items: this.invoiceItems.getValue(),
    };
  }
}
