import { Component, OnInit } from '@angular/core';
import { ChatService } from "../chat.service";
import { GoogleChartComponent } from 'angular-google-charts';

@Component({
  selector: 'audience',
  templateUrl: './audience.component.html',
  styleUrls: ['./audience.component.css']
})
export class AudienceComponent implements OnInit {

  currentPlayer: any;
  nextCompetitor: any;
  competitors: any;
  playerReady: any = false;
  gameOver: boolean = false;


  constructor(private chatService: ChatService) { }

  ngOnInit() {

    this.chatService.getPlayer().subscribe((currentplayer, nextplayer) => {
      this.currentPlayer = currentplayer, 
      this.nextCompetitor = nextplayer;
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
