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
  //currentScores: any[] = [];
  scoreObject: any;
  gameover: string;
  allPlayerScores: any[] = [];
  totalScores: any;
  allScoreObjects: any[] = [];
  judgeCounter: number = 0;
  averageScore: any;


  private url = "http://localhost:3000";
  private socket;

  constructor(private router: Router, private http: HttpClient) {
    this.socket = io(this.url);
  }

  getCompetitors() {
    return this.http.get(`${this.url}/api/competitors`, {
      responseType: "json"
    });
  }

  stopComp() {
    this.gameover = "GAME OVER";
    this.socket.emit("game-over", this.gameover);
  }

  public getgameOver() {
    return Observable.create(observer => {
      this.socket.on("game-over", message => {
        observer.next(message);
      });
    });
  }

  public getClearScores() {
    return Observable.create(observer => {
      this.socket.on("clear-scores", message => {
        observer.next(message);
      });
    });
  }

  getAllScores(allscores) {
    this.allPlayerScores = allscores;
  }

  public sendScore(score) {

    this.judgeCounter++;
    //these are not being used
    // this.currentScores.push(score);
    // this.socket.emit("current-scores", this.currentScores);
   
    this.scoreArray = Object.values(score);

    for (let i = 1; i < this.scoreArray.length; i++) {

      this.totalScore += this.scoreArray[i];
    }

    this.averageScore = this.totalScore/this.judgeCounter;

    this.scoreObject = { average: this.averageScore, totalscore: this.totalScore, ...score };

    this.allScoreObjects.push(this.scoreObject);

    this.socket.emit("total-scores", this.allScoreObjects);
    console.log(this.allScoreObjects);
    
  }

    public getMessages() {
      return Observable.create(observer => {
        this.socket.on("total-scores", message => {
          observer.next(message);
        });
      });
    }

  setTotalScores(scores) {
    this.totalScores = scores;
  }

   //next button
   addPlayerSession() {
   
      //console.log(this.currentScores);
      
      this.allPlayerScores.push(this.totalScores);

      this.socket.emit("all-scores", this.allPlayerScores);
      console.log(this.totalScores);
      this.totalScores = [];

  }

  getAllScoreData() {
    return Observable.create(observer => {
      this.socket.on("all-scores", message => {
        observer.next(message);
      });
    });
  }

  //this is not currently sending to Audience
  // public getScoreData() {
  //   return Observable.create(observer => {
  //     this.socket.on("current-scores", message => {
  //       observer.next(message);
  //     });
  //   });
  // }

  sendPlayer(player) {
    this.socket.emit("new-player", player);
  }

  getPlayer() {
    return Observable.create(observer => {
      this.socket.on("new-player", message => {
        observer.next(message);
      });
    });
  }

  addcompetitor(newCompetitor) {
    return this.http.post(
      `${this.url}/api/competitors`,
      { player_name: newCompetitor, current_competitor: true },
      { responseType: "json" }
    );
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

  
  // clearCurrentScores() {
  //   this.currentScores = [];
  //   this.socket.emit("clear-scores", this.currentScores);
  // }

  // setCurrentCompetitors(competitors) {
  //   this.currentCompetitors = competitors;
  // }

  // getCurrentPlayer() {
  //   return this.currentPlayer;
  // }

  // setCurrentPlayer(current, count) {
  //   this.currentPlayer = current;
  //   this.playerCount = count;
  // }


}
