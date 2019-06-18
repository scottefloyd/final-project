import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-competitor',
  templateUrl: './competitor.component.html',
  styleUrls: ['./competitor.component.css']
})
export class CompetitorComponent implements OnInit {
  competitors: any;

  constructor(private chatService: ChatService) { }

  // this.chatService.getcompetitor().subscribe(response => {
  //   this.competitors = response;
  //   console.log(this.competitors)
  // });
  
  ngOnInit() {
  }

  addNewCompetitor(form) {
    this.chatService.addcompetitor(form.value.name).subscribe(response => {
      this.competitors = response;
    });
    
  }

}
