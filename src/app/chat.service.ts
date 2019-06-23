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

  addcompetitor(newCompetitor) {

    console.log(newCompetitor);
    
    this.socket.emit("new-competitor", newCompetitor);
  }

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

  public sendScore(score, id, name) {

    this.socket.emit("player-scores", score, id, name);

  }

 //next button
 addPlayerSession() {


  this.allPlayerScores.push(this.totalScores);
  this.socket.emit("all-scores", this.allPlayerScores);
  console.log(this.totalScores);
  this.totalScores = [];
}

public getMessages() {
  return Observable.create(observer => {
    this.socket.on("post-scores", message => {
      observer.next(message);
    });
  });
}


  /////////////////////////////////////////////////////////////////////////////



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

  getCurrentScores(scores) {
    this.currentScores = scores;
  }

  updateScore(score) {
    //console.log(score);

    return this.http.put(`${this.url}/api/competitors/${score.id}`, score, {
      responseType: "json"
    });
  }


  //this is not currently sending to Audience
  public getScoreData() {
    return Observable.create(observer => {
      this.socket.on("current-scores", message => {
        observer.next(message);
      });
    });
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


  // getAllScoreData() {
  //   return Observable.create(observer => {
  //     this.socket.on("all-scores", message => {
  //       observer.next(message);
  //     });
  //   });
  // }
}
