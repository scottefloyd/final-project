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
  nextCompetitor: any;
  playerCount: number = 1;
  showstop: boolean = true;
  showstart: boolean = true;

  currentScores: any[] = [];
  message: any;

  constructor(private chatService: ChatService) {}

  ngOnInit() {

    this.chatService.getCurrentPlayers().subscribe(response => {
      this.currentCompetitors = response;   
    });

  }
 
  startCompetition() {

    this.currentPlayer = this.currentCompetitors[0];
    this.chatService.sendPlayer(this.currentCompetitors[0], this.currentCompetitors[1]);
    this.showstart = !this.showstart;
    this.showstop = false;
  }

  stopComp() {
    this.chatService.stopComp();
    this.showstop = !this.showstop;
    this.showstart = true;
  }

  nextPlayer() {

    this.currentPlayer = this.currentCompetitors[this.playerCount];
    this.nextCompetitor = this.currentCompetitors[this.playerCount + 1];
    this.chatService.sendPlayer(this.currentPlayer, this.nextCompetitor);
    this.playerCount++;

  }

  
}
