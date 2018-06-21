import { Component, OnInit, Input } from '@angular/core';
import {ChatMessage} from '../chatmessage'; 
import {EncryptionService} from '../encryption.service';
import { HttpclientService } from '../httpclient.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  isInput: boolean;
  streamerid: string; // This servers as a stream ID, as username is unique
  @Input() chatId: string;
  tempMessage:ChatMessage;
  messages: ChatMessage[] = [];
  crypto:EncryptionService;
  lastMessageTimer: string;
  messageArrayTemp: any[];

  constructor(private httpClient:HttpclientService) {
    this.crypto = new EncryptionService();
   }


  tiles = [
    {text: 'One', cols: 1.80, rows: 5, color: 'primary', isInput: false},
    {text: 'input', cols: 1.80, rows: 0.50, color: 'secondary', isInput: true}
  ];


  ngOnInit() {
  }

  initChat(){

  }

  getChat(){
    this.lastMessageTimer = Math.floor(Date.now() / 1000).toString();
    var resultArray;
    var streamId;
    //Get the new chat messages from the server
    const secondCounter = interval(1000);

    secondCounter.subscribe(n=>{
      this.httpClient.getChat(this.lastMessageTimer, 1, window.localStorage.getItem("cert")).subscribe(result => {
        resultArray = JSON.parse(JSON.stringify(result));
        this.messageArrayTemp = resultArray.chats;
        
        if(this.crypto.checkMessage(this.messageArrayTemp, resultArray.signature)){//integrity check
          if(this.messageArrayTemp.length > 0){
            this.lastMessageTimer = this.messageArrayTemp[this.messageArrayTemp.length -1].timestamp;
            this.messageArrayTemp.forEach(element => {

              this.tempMessage = new ChatMessage();
              this.tempMessage.setMessage(element.message);
              this.tempMessage.setFrom(element.name);
              this.messages.push(this.tempMessage);
            });
          }
        }
      });
    });
  }

  sendChat(message: string){
    this.tempMessage = new ChatMessage();
    this.tempMessage.setMessage(message);
    let messsageEnc = this.crypto.encyptMessage(this.tempMessage.message);
    this.httpClient.postMessage(this.tempMessage.message, messsageEnc,1, window.localStorage.getItem("cert")).subscribe(result =>{
      console.log(result);
    });
    this.getChat();
  }

  setStreamerId(id: string) {
    this.streamerid = id; 
  }
}
