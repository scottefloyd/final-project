import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs";

@Injectable()
export class ChatService {
  messages = [];
  currentCompetitor: any; //when new competitor is up this is updated to update DB w/ scores

  private url = "http://localhost:3000";
  private socket;

  constructor() {
    this.socket = io(this.url);
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
}
