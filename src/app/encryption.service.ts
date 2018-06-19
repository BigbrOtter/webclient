import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
declare var CryptRSA:any;


@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private prvKey:string;
  constructor() { 
    this.prvKey = window.localStorage.getItem("private");
  }

  encyptMessage(message:string){
    var encryptedMessage;
    
    encryptedMessage = crypto.SHA256(message).toString(crypto.enc.Hex);
    let key = new CryptRSA(this.prvKey);
    return key.encryptPrivate(encryptedMessage, 'base64');
  }
}
