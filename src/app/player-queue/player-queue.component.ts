import { Component, OnInit, HostBinding } from "@angular/core";
import { ChatService } from "../chat.service";
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: "player-queue",
  templateUrl: "./player-queue.component.html",
  styleUrls: ["./player-queue.component.css"],

})
export class PlayerQueueComponent implements OnInit {

  currentCompetitors: any;

  constructor(private chatService: ChatService) {
    this.chatService.getCompetitors().subscribe(response => {
      this.currentCompetitors = response;
      
    // for (let index = 0; index < this.currentCompetitors.length; index++) {
    //     if(index < 2) {
    //       console.log(this.currentCompetitors[index]);
    //       this.currentCompetitors = response;
    //     }
        
    // }
    
    });

  }
   
  ngOnInit() {
  }

  addcompetitor(form) {
    this.chatService.addcompetitor(form.value);
    form.reset();
  }

  }
   

