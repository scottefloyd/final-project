import { Component, OnInit, HostBinding, Input } from "@angular/core";
import { ChatService } from "../chat.service";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";

@Component({
  selector: "player-queue",
  templateUrl: "./player-queue.component.html",
  styleUrls: ["./player-queue.component.css"],
  animations: [
    trigger("flyInOut", [
      state("in", style({ transform: `translateX(400px)` })),
      transition(":enter", [
        style({ transform: "translateX(500px)" }),
        animate(1000)
      ]),
      transition("*=>void", [animate(100)])
    ])
  ]
})
export class PlayerQueueComponent implements OnInit {

  currentPlayer: any;
  nextCompetitor: any;
  currentCompetitors: any;
  playerReady: boolean = false;
  nextReady: boolean = false;


  //@Input() nextCompetitor: any;


  constructor(private chatService: ChatService) {}

  ngOnInit() {

  
    this.chatService.getPlayer().subscribe((players) => {
      
      console.log(players.currentplayer, players.nextplayer);

      this.currentPlayer = players.currentplayer;
      this.nextCompetitor = players.nextplayer;

      if (this.nextCompetitor.name) {
        this.nextReady = true;
      }

      if (this.currentPlayer.name) {
        this.playerReady = true;
      }
    });

    this.chatService.getCurrentPlayers().subscribe(response => {
      this.currentCompetitors = response;
      
    });

  }
}
