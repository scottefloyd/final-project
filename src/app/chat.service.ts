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
    //console.log(this.currentPlayer);
  }

  //getting message from component and sends it to the server
  public sendMessage(message) {
    this.socket.emit("new-message", message);
  }

  //creating observable which gets the new message from the server which compents will subscribe
  //to to receive updates
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
    //console.log(newCompetitor);
    return this.http.post(
      `${this.url}/api/competitors`,
      { player_name: newCompetitor, current_competitor: true },
      { responseType: "json" }
    );
  }

  // public addScores(newScore) {
  //     return this.http.post("/api/competitor", newScore);

  // }
}
