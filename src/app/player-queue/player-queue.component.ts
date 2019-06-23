import { Component, OnInit, HostBinding } from "@angular/core";
import { ChatService } from "../chat.service";
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: "player-queue",
  templateUrl: "./player-queue.component.html",
  styleUrls: ["./player-queue.component.css"],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: `translateX(400px)`})),
      transition(':enter', [
        style({transform:'translateX(500px)'}),
        animate(1000)
      ]),
      transition('*=>void', [
        
        animate(100)
      ])
    ])
    
  ]

})
export class PlayerQueueComponent implements OnInit {
  currentCompetitors: any;

  constructor(private chatService: ChatService) {

    this.chatService.displayCurrentCompetitors().subscribe(response => {
      this.currentCompetitors = response;        
    });


    // this.chatService.getCompetitors().subscribe(response => {
    //   this.currentCompetitors = response;

    // });


  }

  ngOnInit() {

    this.chatService.getCurrentPlayers().subscribe(response => {
      this.currentCompetitors = response;
      //console.log(response);
           
    });
    
  }

 
}
