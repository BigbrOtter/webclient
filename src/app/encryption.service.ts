import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
declare var CryptRSA:any;


@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  key: any;

  private prvKey:string;
  constructor() { 
    this.prvKey = window.localStorage.getItem("private");
  }

  encyptMessage(message:string){
    var encryptedMessage;
    

    console.log("called");
    
    
    encryptedMessage = crypto.SHA256(message).toString(crypto.enc.Hex);
    let key = new CryptRSA(this.prvKey);
    console.log(key.encryptPrivate(encryptedMessage, 'base64'));
    return key.encryptPrivate(encryptedMessage, 'base64');
  
  }
}
