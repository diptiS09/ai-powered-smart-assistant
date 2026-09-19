import { Component } from '@angular/core';
import { ChatService } from '../../services/chat';

@Component({
  selector: 'app-activity',
  standalone:true,
  imports: [],
  templateUrl: './activity.html',
  styleUrl: './activity.scss'
})
export class Activity {
   activities: any[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.activities$
      .subscribe((activities) => {
        this.activities = activities;
      });
  }
}