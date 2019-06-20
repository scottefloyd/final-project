import { Component, OnInit } from "@angular/core";
import { ChatService } from "../chat.service";
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({

  selector: 'organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: `translateX(0)`})),
      transition('void =>*', [
        style({transform:'translateX(25px)'}),
        animate(2000)
      ]),
      transition('*=>void', [
        animate(100)
      ])
    ])
    
  ]

})
export class OrganizerComponent implements OnInit {
  currentCompetitors: any;
  currentPlayer: any;
  playerCount: number = 1;
  currentScores: any[] = [];
  message: any;

  constructor(private chatService: ChatService) {}

  ngOnInit() {

    this.chatService.displayCurrentCompetitors().subscribe(response => {
      this.currentCompetitors = response;    
    });

    this.chatService.getScoreData().subscribe(response => {
      this.currentScores = response;
      this.chatService.getCurrentScores(this.currentScores);      
    });

    this.chatService.getMessages().subscribe(message => {
      //console.log(message);
      this.message = message;
      this.chatService.setTotalScores(this.message);

      //this.messages.push(message);
      // if (this.messages) {
      //   this.playerReady = true;
      // }
    });
  }

  startCompetition() {
    this.chatService.getCompetitors().subscribe(response => {
      this.currentCompetitors = response;
      this.chatService.loadCurrentCompetitors(this.currentCompetitors);
      this.chatService.sendPlayer(this.currentCompetitors[0]);
    });
  }

  stopComp() {
    this.chatService.stopComp();
  }

  nextPlayer() {
    this.currentPlayer = this.currentCompetitors[this.playerCount];
    this.chatService.sendPlayer(this.currentPlayer);
    this.playerCount++;
    this.chatService.addPlayerSession();

  }

  
}
