import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
declare var CryptRSA:any;


@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private prvKey:string;
  private pubKey:string;
  constructor() { 
    this.prvKey = window.localStorage.getItem("private");
    this.pubKey = window.localStorage.getItem("public");
    
  }

  encyptMessage(message:string){
    var encryptedMessage;
    
    encryptedMessage = crypto.SHA256(message).toString(crypto.enc.Hex);
    let key = new CryptRSA(this.prvKey);
    return key.encryptPrivate(encryptedMessage, 'base64');
  }

  checkMessage(message:string[], messageEnc:string){
    var hash = crypto.SHA256(JSON.stringify(message)).toString(crypto.enc.Hex);
    var decrypted;
    let key = new CryptRSA(this.pubKey);    

    decrypted = key.decryptPublic(messageEnc).toString();

    if(hash != decrypted){
      return false;
    }

    return true;
  }
}
