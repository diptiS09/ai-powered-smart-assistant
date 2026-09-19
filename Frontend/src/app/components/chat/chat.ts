import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.scss'
})
export class Chat {
  messageControl = new FormControl('');
  isLoading = false;
  errorMessage = '';
  messages = [
    {
      role: 'assistant',
      content: 'Hello! I can help you with your account, support tickets, and customer information.'
    }
  ];

  constructor(private chatService: ChatService) { }

  sendMessage(): void {
    const message = this.messageControl.value?.trim();

    if (!message || this.isLoading) {
      return;
    }

    this.messages.push({
      role: 'user',
      content: message
    });

    this.messageControl.reset();
    this.isLoading = true;
    this.errorMessage = '';
    this.chatService.sendMessage('CUST001', message).subscribe({
        next: (response) => {
          this.messages.push({
            role: 'assistant',
            content: response.message
          });
          this.chatService.updateActivities(
            response.activities
          );
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.messages.push({
            role: 'assistant',
            content: 'Sorry, something went wrong while processing your request.'
          });
          this.errorMessage = 'Unable to connect to the AI assistant.';
          this.isLoading = false;
        }
      });
  }
}