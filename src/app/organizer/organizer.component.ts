import { Component, OnInit } from '@angular/core';
import { ChatService } from "../chat.service";

@Component({
  selector: 'organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {

  currentCompetitors: any;

  constructor(private chatService: ChatService) {
    this.chatService.getCompetitors().subscribe(response => {
      this.currentCompetitors = response;
      console.log(this.currentCompetitors);
    });
  }

  ngOnInit() {

  }

  startCompetition() {
    
    this.chatService.getCompetitors().subscribe(response => { 
      this.currentCompetitors = response;
      
      
    });
  

  }

  

}
