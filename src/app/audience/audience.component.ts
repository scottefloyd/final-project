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


  //maybe rethink how we build this message and emit it to the component.
  ngOnInit() {
    this.chatService.getMessages().subscribe(message => {
      this.messages = message;
       console.log(message);
      //this.messages.push(message);
      if (this.messages) {
        this.playerReady = true;
      }
    });
    this.chatService.getgameOver().subscribe(message => {
      this.gameOver = message;
    });

    this.chatService.getAllScoreData().subscribe(response => {
      // this.allPlayerScores = response[response.length - 1];
      this.allPlayerScores = response;
      //console.log(this.allPlayerScores); 
      this.chatService.getAllScores(this.allPlayerScores);
    }); 
    
  }

}
