import { Component, OnInit } from '@angular/core';
import { ChatService } from "../chat.service";
import { GoogleChartComponent } from 'angular-google-charts';

@Component({
  selector: 'audience',
  templateUrl: './audience.component.html',
  styleUrls: ['./audience.component.css']
})
export class AudienceComponent implements OnInit {


  // 

  messages: any[] =[];

  message: any;


  myData: any[] = [];

  myData2: any[] =[];

  myColumnNames =  ['Category', 'Score'];
    
  myOptions = {
    colors: ['#e0443e', '#a6693e', '#f3b49f']
  };

  
  myType = "BarChart";
 

  
  playerReady: any = false;
  gameOver: any;
  allPlayerScores: [];


  constructor(private chatService: ChatService) { }


  //maybe rethink how we build this message and emit it to the component.
  ngOnInit() {
    this.chatService.getMessages().subscribe(message => {

      // console.log(message);
      this.messages.push(message);
      // console.log(this.messages);

      this.myData = [
        ['Style', this.messages[0].style],
        ['Skill', this.messages[0].skill],
        ['Originality', this.messages[0].originality],
        ['Effort', this.messages[0].effort],
       [ 'Average', this.messages[0].average],
       [  'Total', this.messages[0].total]
    
      ];

      // this.myData2 = [
      //   ['Style', this.messages[1].style],
      //   ['Skill', this.messages[1].skill],
      //   ['Originality', this.messages[1].originality],
      //   ['Effort', this.messages[1].effort]
    
      // ];

      // console.log(this.messages[0].skill)
    
       

      // console.log(data);
    
      
    
      
    });

      this.messages = message;
       console.log(message);
      //this.messages.push(message);
      if (this.messages) {
        this.playerReady = true;
      }
    });
    this.chatService.getgameOver().subscribe(message => {
      this.gameOver = message;
    });

    this.chatService.getAllScoreData().subscribe(response => {
      // this.allPlayerScores = response[response.length - 1];
      this.allPlayerScores = response;
      //console.log(this.allPlayerScores); 
      this.chatService.getAllScores(this.allPlayerScores);
    }); 
    
  }

}
