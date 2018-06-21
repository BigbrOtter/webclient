import { Component, OnInit, Input } from '@angular/core';
import {ChatMessage} from '../chatmessage'; 
import {EncryptionService} from '../encryption.service';
import { HttpclientService } from '../httpclient.service';
import { interval } from 'rxjs';
import {StreamidService} from '../streamid.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  isInput: boolean;
  streamerid: string; // This servers as a stream ID
  @Input() chatId: string;

  temp:ChatMessage;
  messages: ChatMessage[] = [];
  crypto: EncryptionService;
  tempMessage:ChatMessage;
  lastMessageTimer: string;
  messageArrayTemp: any[];
  secondCounter:any;

  constructor(private httpClient:HttpclientService, private dataPasser: StreamidService) {
    this.crypto = new EncryptionService();
    this.streamerid = null;
    this.dataPasser.passStreamId$.subscribe(result =>{
      this.streamerid = result;
      if(result.length > 5){
        this.getChat();
      }
    });
   }


  tiles = [
    {text: 'One', cols: 1.80, rows: 5, color: 'primary', isInput: false},
    {text: 'input', cols: 1.80, rows: 0.50, color: 'secondary', isInput: true}
  ];


  ngOnInit() {
    this.secondCounter = interval(1000);
    //this.getChat();
  }

  getChat(){
    this.lastMessageTimer = Math.floor(Date.now() / 1000).toString();
    var resultArray;
    var streamId;
    //Get the new chat messages from the server

      this.secondCounter.subscribe(n=>{
      this.httpClient.getChat(this.lastMessageTimer, this.streamerid, window.localStorage.getItem("cert")).subscribe(result => {
        resultArray = JSON.parse(JSON.stringify(result));
        this.messageArrayTemp = resultArray.chats;
        
        if(this.messageArrayTemp != undefined){
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
        }
      });
    });
  }

  sendChat(message: string){
    if(this.streamerid != null){
      this.tempMessage = new ChatMessage();
      this.tempMessage.setMessage(message);
      let messsageEnc = this.crypto.encyptMessage(this.tempMessage.message);
      this.httpClient.postMessage(this.tempMessage.message, messsageEnc, this.streamerid, window.localStorage.getItem("cert")).subscribe(result =>{
      });
    } else{
      var temp = new ChatMessage();
      temp.setMessage("Geen stream geselecteerd");
      this.messages.push(temp);
    }

  }

  setStreamerId(id: string) {
    this.streamerid = id; 
  }
}
