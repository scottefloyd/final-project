import { Component, OnInit } from '@angular/core';
import { ChatService } from "../chat.service";

@Component({
  selector: 'judge',
  templateUrl: './judge.component.html',
  styleUrls: ['./judge.component.css']
})
export class JudgeComponent implements OnInit {

  currentPlayer: any;
  nextCompetitor: any;
  currentCompetitors: any;
  playerScore: any;
  playerReady = false;
  gameOver: boolean = false;

  standBy:boolean = false;


  constructor(private chatService: ChatService) { }

  ngOnInit() {

    this.chatService.getCurrentPlayers().subscribe(response => {
      this.currentCompetitors = response;
           
    });

    this.chatService.getPlayer().subscribe( (player) => {
      this.currentPlayer = player.currentplayer;   
      this.nextCompetitor = player.nextplayer; 

      // console.log(currentplayer);
      // console.log(nextplayer);
      

      if (this.currentPlayer.name) {
            this.playerReady = true;
        }
    });

    this.chatService.getgameOver().subscribe(message => {
      this.gameOver = message;
      // console.log(this.gameOver);
      
    });

    this.chatService.standBy().subscribe(message => {
      this.standBy = message;
      
      
    });
    
   
   }

   submitScore(form) {
    this.playerScore = {
      style: form.value.style,
      skill: form.value.skill,
      originality: form.value.originality,
      effort: form.value.effort
     }

     this.chatService.sendScore(this.playerScore, this.currentPlayer.id, this.currentPlayer.name);
     this.standBy = true;

     //hide form and display next competitor name, redisplay form when next competitor is up.

      
    form.reset();
    
  }

   
}
