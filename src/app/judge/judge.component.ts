import { Component, OnInit } from '@angular/core';
import { ChatService } from "../chat.service";

@Component({
  selector: 'judge',
  templateUrl: './judge.component.html',
  styleUrls: ['./judge.component.css']
})
export class JudgeComponent implements OnInit {

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

  addcompetitor(form) {
    this.chatService.addcompetitor(form.value);
    form.reset();
  }

   //pass along message value to our service
   sendMessage(form) {
     
     
    this.chatService.sendMessage(form.value);
    form.reset();
  }

}
