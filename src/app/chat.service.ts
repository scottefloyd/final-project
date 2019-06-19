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

  private url = "http://localhost:3000";
  private socket;

  constructor(private router: Router, private http: HttpClient) {
    this.socket = io(this.url);
  }

  //getting array of current competitors
  getCompetitors() {
    return this.http.get(`${this.url}/api/competitors`, {
      responseType: "json"
    });
  }

  setCurrentCompetitors(competitors) {
    this.currentCompetitors = competitors;
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  setCurrentPlayer(current, count) {
    this.currentPlayer = current;
    this.playerCount = count;
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

  clearCurrentScores() {
    this.currentScores = [];
    this.socket.emit("clear-scores", this.currentScores);
  }

  public getClearScores() {
    return Observable.create(observer => {
      this.socket.on("clear-scores", message => {
        observer.next(message);
      });
    });
  }


  //next button
  addPlayerSession() {
    if (this.playerCount > 1) {
      this.allPlayerScores.push(this.currentScores);
      this.socket.emit("all-scores", this.allPlayerScores);
    } 
  }

  getAllScores(allscores) {
    this.allPlayerScores = allscores;
  }

  getCurrentScores(scores) {
    this.currentScores = scores;
  }

  //getting message from component and sends it to the server
  public sendMessage(message) {

    this.currentScores.push(message);

    this.socket.emit("current-scores", this.currentScores);
   

    this.scoreArray = Object.values(message);
    for (let i = 1; i < this.scoreArray.length; i++) {
      this.totalScore += this.scoreArray[i];
    }
    this.scoreObject = { totalscore: this.totalScore, ...message };

    this.socket.emit("new-message", this.scoreObject);
  }

  getAllScoreData() {
    return Observable.create(observer => {
      this.socket.on("all-scores", message => {
        observer.next(message);
      });
    });

  }

  public getScoreData() {
    return Observable.create(observer => {
      this.socket.on("current-scores", message => {
        observer.next(message);
      });
    });
  }

  //creating observable which gets the new message from the server which compents will subscribe to receive updates
  public getMessages() {
    return Observable.create(observer => {
      this.socket.on("new-message", message => {
        observer.next(message);
      });
    });
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

  addcompetitor(newCompetitor) {
    return this.http.post(
      `${this.url}/api/competitors`,
      { player_name: newCompetitor, current_competitor: true },
      { responseType: "json" }
    );
  }

  // <<<<<<< dance-styling
  //     getCompetitor() {

  //       return this.http.get(`${this.url}/api/competitors`, { responseType: "json"});

  //     }

  //     public addScores(newScore) {
  //       return this.http.post("/api/competitor", newScore);

  //   }

  //   removePlayer() {
  //     this.currentCompetitors.shift();
  //   }

  // =======
  // public addScores(newScore) {
  //     return this.http.post("/api/competitor", newScore);

  // }
}
