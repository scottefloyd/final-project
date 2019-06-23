import { Component, OnInit } from '@angular/core';
import { ChatService } from "../chat.service";

@Component({
  selector: 'judge',
  templateUrl: './judge.component.html',
  styleUrls: ['./judge.component.css']
})
export class JudgeComponent implements OnInit {

  currentPlayer: any;
  currentCompetitors: any;
  playerScore: any;
  playerReady = false;

  constructor(private chatService: ChatService) { }

  ngOnInit() {

    this.chatService.getCurrentPlayers().subscribe(response => {
      this.currentCompetitors = response;
           
    });

    this.chatService.getPlayer().subscribe(response => {
      this.currentPlayer = response;
      console.log(response);
      

      if (this.currentPlayer.name) {
            this.playerReady = true;
        }

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

     //hide form and display next competitor name, redisplay form when next competitor is up.

      
    form.reset();
  }

}
