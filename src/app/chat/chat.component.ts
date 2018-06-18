import { Component, OnInit } from '@angular/core';
import {ChatMessage} from '../chatmessage'; 
import {EncryptionService} from '../encryption.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  isInput: boolean;
  temp:ChatMessage;
  messages: ChatMessage[] = [];
  i:number;
  crypto:EncryptionService;

  constructor() {
    this.i = 0;
    this.crypto = new EncryptionService();
   }


  tiles = [
    {text: 'One', cols: 1.80, rows: 5, color: 'lightblue', isInput: false},
    {text: 'input', cols: 1.80, rows: 0.50, color: 'green', isInput: true}
  ];


  ngOnInit() {
  }

  test(){
    this.temp = {message: "Hallo wereld!", timestamp:"100", from:"Henk", to:"temp"};
    this.i++;

    this.crypto.encyptMessage(this.temp.message);
    this.messages.push(this.temp);
  }







}
