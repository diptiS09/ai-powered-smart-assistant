import { Component } from '@angular/core';
import { Chat } from '../chat/chat';
import { Customer } from '../customer/customer';
import { Activity } from '../activity/activity';
import { Tickets } from '../tickets/tickets';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [Chat, Customer, Activity, Tickets],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
