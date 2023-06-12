import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
             selector: 'app-chat-gpt',
             templateUrl: './chat-gpt.component.html',
             styleUrls: ['./chat-gpt.component.scss']
           })
export class ChatGptComponent {
  question: string = '';
  responseText: string = '';

  constructor(private http: HttpClient) { }

  submitQuestion() {
    const apiUrl = 'http://localhost/api/ask/chat-gpt/' + this.question;

    this.http.get(apiUrl).subscribe((response: any) => {
      this.responseText = response[0].text;

      console.log('anwtoord', this.responseText);
      console.log('anwtoord', response[0]);
    });
  }
}
