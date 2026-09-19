import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-tickets',
  standalone:true,
  imports: [],
  templateUrl: './tickets.html',
  styleUrl: './tickets.scss'
})
export class Tickets implements OnInit {
  tickets: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private apiService: Api) {}

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.isLoading = true;
    this.errorMessage = '';

    this.apiService.getCustomerTickets('CUST001').subscribe({
      next: (response) => {
        this.tickets = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Tickets API error:', error);
        this.errorMessage = 'Unable to load support tickets.';
        this.isLoading = false;
      }
    });
  }
}