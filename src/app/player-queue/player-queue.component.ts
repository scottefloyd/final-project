import { Component, OnInit } from "@angular/core";
import { ChatService } from "../chat.service";

@Component({
  selector: "player-queue",
  templateUrl: "./player-queue.component.html",
  styleUrls: ["./player-queue.component.css"]
})
export class PlayerQueueComponent implements OnInit {
  currentCompetitors: any;

  constructor(private chatService: ChatService) {
    this.chatService.getCompetitors().subscribe(response => {
      this.currentCompetitors = response;
    });
  }

  ngOnInit() {}

 
}
