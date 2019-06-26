import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ChatService {
  messages = [];
  currentCompetitors: any;
  currentPlayer: any;
  playerCount: number = 0;
  totalScore: number = 0;
  scoreArray: any;
  currentScores: any[] = [];
  scoreObject: any;
  gameover: string;
  allPlayerScores: any[] = [];
  totalScores: any;
  allScoreObjects: any[] = [];
  judgeCounter: number = 0;
  averageScore: any;
  standby:boolean;
  showqueue:boolean;

  private url = "http://localhost:3000";
  private socket;

  constructor(private router: Router, private http: HttpClient) {
    this.socket = io(this.url);
  }

  public getCurrentPlayers() {
    return Observable.create(observer => {
      this.socket.on("get-current-players", message => {
        observer.next(message);
      });
    });
  }

  addcompetitor(newCompetitor, avatar) {
    this.socket.emit("new-competitor", newCompetitor, avatar);
  }

  sendPlayer(player, nextplayer) {
    this.socket.emit("new-player", player, nextplayer);
    console.log(player);
    
  }

  public getMessages() {
    return Observable.create(observer => {
      this.socket.on("post-scores", message => {
        observer.next(message);
    
      });
    });
  }

  getPlayer() {
    return Observable.create(observer => {
      this.socket.on("new-player", (currentplayer, nextplayer) => {
        observer.next({currentplayer, nextplayer});
        
        
      });
      // this.socket.on("next-player", (nextplayer) => {
      //   observer.next(nextplayer);
      // });
    });
  }

  getNext() {
    return Observable.create(observer => {
     
      this.socket.on("next-player", (nextplayer) => {
        observer.next(nextplayer);

      });
    });
  }

  public sendScore(score, id, name) {
    this.socket.emit("player-scores", score, id, name);
  }

  stopComp() {
  
    this.socket.emit("game-over");
  }

  standingBy() {
    this.socket.emit("stand-by");
  }
  
  public standBy() {
    return Observable.create(observer => {
      this.socket.on("stand-by", message => {
        observer.next(message);
        
        
      });
    });
  }


  nameSubmited() {
    return Observable.create(observer => {
      this.socket.on("name-submit", message => {
        observer.next(message);
      });
    });
  }

  showPlayerQueue(){
    return Observable.create(observer => {
      this.socket.on("player-queue", message => {
        observer.next(message);
      })
    })
  }


  /////////////////////////////////////////////////////////////////////////////

  getCompetitors() {
    return this.http.get(`${this.url}/api/competitors`, {
      responseType: "json"
    });
  }

  public getgameOver() {
    return Observable.create(observer => {
      this.socket.on("game-over", message => {
        observer.next(message);
      });
    });
  }

  // public getClearScores() {
  //   return Observable.create(observer => {
  //     this.socket.on("clear-scores", message => {
  //       observer.next(message);
  //     });
  //   });
  // }

  getAllScores(allscores) {
    this.allPlayerScores = allscores;
  }

  getCurrentScores(scores) {
    this.currentScores = scores;
  }



  loadCurrentCompetitors(competitors) {
    this.socket.emit("load-competitors", competitors);
  }

  displayCurrentCompetitors() {
    return Observable.create(observer => {
      this.socket.on("load-competitors", message => {
        observer.next(message);
      });
    });
  }

  setTotalScores(scores) {
    this.totalScores = scores;
  }

  

}
