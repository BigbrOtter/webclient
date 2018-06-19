import { Component, OnInit, Input } from '@angular/core';
import {ChatMessage} from '../chatmessage'; 
import {EncryptionService} from '../encryption.service';
import { HttpclientService } from '../httpclient.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  isInput: boolean;
  streamerid: string; // This servers as a stream ID, as username is unique
  @Input() chatId: string;

  temp:ChatMessage;
  messages: ChatMessage[] = [];
  crypto: EncryptionService;

  constructor(private httpClient:HttpclientService) {
    this.crypto = new EncryptionService();
    this.temp = new ChatMessage();
   }


  tiles = [
    {text: 'One', cols: 1.80, rows: 5, color: 'lightblue', isInput: false},
    {text: 'input', cols: 1.80, rows: 0.50, color: 'green', isInput: true}
  ];


  ngOnInit() {

    console.log(this.chatId);

  }

  test(message: string){
    this.temp = new ChatMessage();
    this.temp.setMessage(message);
    console.log(message);
    let messsage = this.crypto.encyptMessage(this.temp.message);
    this.httpClient.postMessage(this.temp.message, messsage,1, window.localStorage.getItem("cert")).subscribe(result =>{
      console.log(result);
    });

    this.messages.push(this.temp);
    document.getElementById("usermsg").innerText.toUpperCase();
  }

  setStreamerId(id: string) {
    this.streamerid = id; 
  }





}
