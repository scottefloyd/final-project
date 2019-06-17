import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'player-queue',
  templateUrl: './player-queue.component.html',
  styleUrls: ['./player-queue.component.css']
})
export class PlayerQueueComponent implements OnInit {



  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

}
