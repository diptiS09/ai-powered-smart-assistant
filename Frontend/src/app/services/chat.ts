import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = 'http://localhost:3000/api';
  private activitiesSubject = new BehaviorSubject<any[]>([
    {
      message: 'Waiting for your request',
      status: 'waiting'
    }
  ]);
  activities$ = this.activitiesSubject.asObservable();
  
  constructor(private http: HttpClient) {}

  sendMessage(customerId: string, message: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/chat`, {
      customerId,
      message
    });
  }

  updateActivities(activities: any[]): void {
    this.activitiesSubject.next(activities);
  }
}