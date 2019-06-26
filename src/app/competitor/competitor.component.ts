import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-competitor',
  templateUrl: './competitor.component.html',
  styleUrls: ['./competitor.component.css']
})
export class CompetitorComponent implements OnInit {
  currentPlayer: any;
  gameOver: boolean = false;
  competitors: any;
  currentCompetitors: any;

  constructor(private chatService: ChatService) { }

  
  

  ngOnInit() {

    this.chatService.getCurrentPlayers().subscribe(response => {
      this.currentCompetitors = response;
    });

    this.chatService.getPlayer().subscribe(response => {
      this.currentPlayer = response;
    });

    this.chatService.getgameOver().subscribe(message => {
      this.gameOver = message;
    });
    
  }

  addNewCompetitor(form) {
    this.chatService.addcompetitor(form.value.name);
    
  }



}

