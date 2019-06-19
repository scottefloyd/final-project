import { Component, OnInit } from "@angular/core";
import { ChatService } from "../chat.service";

@Component({
  selector: "organizer",
  templateUrl: "./organizer.component.html",
  styleUrls: ["./organizer.component.css"]
})
export class OrganizerComponent implements OnInit {
  currentCompetitors: any;
  currentPlayer: any;
  playerCount: number = 0;
  currentScores: any[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.getCompetitors().subscribe(response => {
      this.currentCompetitors = response;
      this.chatService.setCurrentCompetitors(this.currentCompetitors);
    });

    this.chatService.getScoreData().subscribe(response => {
      this.currentScores = response;
      this.chatService.getCurrentScores(this.currentScores);      
    });

    this.chatService.getClearScores().subscribe(response => {
      this.currentScores = response;
      this.chatService.getClearScores();      
    });
  }

  startCompetition() {
    this.chatService.getCompetitors().subscribe(response => {
      this.currentCompetitors = response;
    });
  }

  stopComp() {
    this.chatService.stopComp();
  }

  nextPlayer() {
    this.currentPlayer = this.currentCompetitors[this.playerCount];
    this.chatService.sendPlayer(this.currentPlayer);
    this.playerCount++;
    this.chatService.setCurrentPlayer(this.currentPlayer, this.playerCount);
    this.chatService.addPlayerSession();
    this.chatService.clearCurrentScores();
  }
}
