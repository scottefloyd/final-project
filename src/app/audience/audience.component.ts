import { Component, OnInit } from '@angular/core';
import { ChatService } from "../chat.service";

@Component({
  selector: 'audience',
  templateUrl: './audience.component.html',
  styleUrls: ['./audience.component.css']
})
export class AudienceComponent implements OnInit {

  currentPlayer: any;
  competitors: any;
  playerReady: any = false;
  gameOver: any;
  allPlayerScores: [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {

    this.chatService.getPlayer().subscribe(response => {
      this.currentPlayer = response;
    });

    this.chatService.getMessages().subscribe(message => {
      this.competitors = message;
      if (this.competitors) {
        this.playerReady = true;
      }
    });
    
    this.chatService.getgameOver().subscribe(message => {
      this.gameOver = message;
    });

 

  }

}
