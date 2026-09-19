import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';


@Component({
  selector: 'app-customer',
  standalone:true,
  imports: [],
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class Customer implements OnInit {
  customer: any = null;
  isLoading = false;
  errorMessage = '';
  
  constructor(private apiService: Api) {}

  ngOnInit() {
    this.loadCustomer();
  }

  loadCustomer() {
    this.isLoading = true;
    this.errorMessage = '';

    this.apiService.getCustomer('CUST001').subscribe({
      next: (response) => {
        this.customer = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Customer API error:', error);
        this.errorMessage = 'Unable to load customer information.';
        this.isLoading = false;
      }
    });
  }
}
