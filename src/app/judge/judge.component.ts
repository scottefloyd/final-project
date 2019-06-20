import { Component, OnInit } from '@angular/core';
import { ChatService } from "../chat.service";

@Component({
  selector: 'judge',
  templateUrl: './judge.component.html',
  styleUrls: ['./judge.component.css']
})
export class JudgeComponent implements OnInit {

  currentPlayer: any;
  count: number = 0;
  playerScore: any;
  playerReady = false;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getPlayer().subscribe(message => {
      this.currentPlayer = { name: message.player_name, ...message };
      //console.log(this.currentPlayer);
      if (this.currentPlayer.name) {
        this.playerReady = true;
      }
    });
   }

   //pass along message value to our service
   submitScore(form) {
   
    this.playerScore = {
      player_name: this.currentPlayer.player_name,
      style: form.value.style,
      skill: form.value.skill,
      originality: form.value.originality,
      effort: form.value.effort
     }

     this.chatService.sendScore(this.playerScore); 
      
    form.reset();
  }

}
