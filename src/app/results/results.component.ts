import { Component, OnInit } from '@angular/core';
import { ChatService } from "../chat.service";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  highscores:any = [];

  constructor(private chatService: ChatService) {}
    
  ngOnInit() {
    this.chatService.getAllAverages().subscribe(response => {
      this.highscores = response;
      console.log(this.highscores);
    });
    

  }

}
