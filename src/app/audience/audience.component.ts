import { Component, OnInit } from '@angular/core';
import { ChatService } from "../chat.service";

@Component({
  selector: 'audience',
  templateUrl: './audience.component.html',
  styleUrls: ['./audience.component.css']
})
export class AudienceComponent implements OnInit {

  messages: string[] = [];

  constructor(private chatService: ChatService) { }


  //this subscribes to the service observable which provides updates when it 
  //receives updates and pushes new messages to the messages array
  ngOnInit() {
    this.chatService.getMessages().subscribe(message => {

      this.messages.push(message);
      //console.log(message);
      
    
    });
  }

}
