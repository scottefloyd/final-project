import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-competitor',
  templateUrl: './competitor.component.html',
  styleUrls: ['./competitor.component.css']
})
export class CompetitorComponent implements OnInit {

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

  joinQueue(form) {
    this.chatService.inQueue(form.value);
    console.log(form.value);
  }

}
