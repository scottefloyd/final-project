import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-competitor',
  templateUrl: './competitor.component.html',
  styleUrls: ['./competitor.component.css']
})
export class CompetitorComponent implements OnInit {
  currentPlayer: any;

  competitors: any;
  currentCompetitors: any;

  constructor(private chatService: ChatService) { }

  // this.chatService.getcompetitor().subscribe(response => {
  //   this.competitors = response;
  //   console.log(this.competitors)
  // });
  
  ngOnInit() {

    this.chatService.getCurrentPlayers().subscribe(response => {
      this.currentCompetitors = response;
           
    });

    this.chatService.getPlayer().subscribe(response => {
      this.currentPlayer = response;

    });
    
  }

  addNewCompetitor(form) {
    this.chatService.addcompetitor(form.value.name);
    
    // .subscribe(response => {
    //   this.competitors = response;
    // });
    
  }

}
