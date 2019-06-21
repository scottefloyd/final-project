import { Component, OnInit } from '@angular/core';
import { ChatService } from "../chat.service";

@Component({
  selector: 'audience',
  templateUrl: './audience.component.html',
  styleUrls: ['./audience.component.css']
})
export class AudienceComponent implements OnInit {

  messages: string[] = [];
  playerReady: any = false;
  message: any;
  gameOver: any;
  allPlayerScores: [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getMessages().subscribe(message => {
      this.messages = message;
      if (this.messages) {
        this.playerReady = true;
      }
    });
    this.chatService.getgameOver().subscribe(message => {
      this.gameOver = message;
    });

 

  }

}
