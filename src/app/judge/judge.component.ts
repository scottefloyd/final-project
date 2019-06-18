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

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getPlayer().subscribe(message => {
      this.currentPlayer = message;
      console.log(this.currentPlayer);
    });


    // this.currentPlayer = this.chatService.getCurrentPlayer();
    // console.log(this.currentPlayer);

   }


   //pass along message value to our service
   sendMessage(form) {
     
    this.chatService.sendMessage(form.value);
    console.log(form.value);
    
    form.reset();
  }

}
