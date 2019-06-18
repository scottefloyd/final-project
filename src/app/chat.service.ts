import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class ChatService {  
  messages = [];
  currentCompetitor: any; //when new competitor is up this is updated to update DB w/ scores
  currentCompetitors = [];

  private url = "http://localhost:3000";
  private socket;

  constructor(private router: Router, private http: HttpClient) {
    
    this.socket = io(this.url);
  }

  //getting array of current competitors
  getCompetitors() {
    
    return this.http.get(`${this.url}/api/competitors`, { responseType: "json" });
  }

  setCurrentCompetitors (currentlist) {
    this.currentCompetitors = currentlist;
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

   addcompetitor(newCompetitor) {
    console.log(newCompetitor);
    return this.http.post(`${this.url}/api/competitors`, {player_name: newCompetitor, current_competitor: true}, {responseType: "json"});
    
    
  }


    getCompetitor() {
      return this.http.get(`${this.url}/api/competitors`, { responseType: "json"});
    }

  public addScores(newScore) {
      return this.http.post("/api/competitor", newScore);
    
  }


}
