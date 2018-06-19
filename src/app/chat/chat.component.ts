import { Component, OnInit } from '@angular/core';
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
  tempMessage:ChatMessage;
  messages: ChatMessage[] = [];
  crypto:EncryptionService;
  lastMessageTimer: string;
  messageArrayTemp: any[];

  constructor(private httpClient:HttpclientService) {
    this.crypto = new EncryptionService();
    this.tempMessage = new ChatMessage();

   }


  tiles = [
    {text: 'One', cols: 1.80, rows: 5, color: 'lightblue', isInput: false},
    {text: 'input', cols: 1.80, rows: 0.50, color: 'green', isInput: true}
  ];


  ngOnInit() {
    this.lastMessageTimer = Math.floor(Date.now() / 1000).toString();
    var resultArray;
    //Get the new chat messages from the server --atm not with guaranteed integrity
    const secondCounter = interval(5000);

    secondCounter.subscribe(n=>{
      this.httpClient.getChat(this.lastMessageTimer, 1, window.localStorage.getItem("cert")).subscribe(result => {
        console.log(result);
        resultArray = JSON.parse(JSON.stringify(result));

        this.messageArrayTemp = resultArray.chats;

        if(this.crypto.checkMessage(this.messageArrayTemp, resultArray.signature)){
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
    console.log(message);
    let messsageEnc = this.crypto.encyptMessage(this.tempMessage.message);
    this.httpClient.postMessage(this.tempMessage.message, messsageEnc,1, window.localStorage.getItem("cert")).subscribe(result =>{
      console.log(result);
    });
  }







}
