import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {

  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getCustomer(customerId: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/customers/${customerId}`);
}

  getCustomerTickets(customerId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/customers/${customerId}/tickets`);
  }

  getTicket(ticketId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/tickets/${ticketId}`);
  }

  createTicket(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tickets`, data);
  }

  updateCustomer(customerId: string, data: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/customers/${customerId}`,
      data
    );
  }
}