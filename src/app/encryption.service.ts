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

  // decryptHash

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

  checkStream(message:string, messageEnc:string){
    var hash = crypto.SHA256(message).toString(crypto.enc.Hex);
    let decrypted;
    // console.log("messageenc: " + messageEnc);
    // console.log("hash: " + hash);


    // console.log("Message: " + message);
    let key = new CryptRSA(this.pubKey);
    // console.log("key: " + this.pubKey);
    // console.log(key);
    // console.log(messageEnc.length);
    // console.log(messageEnc);
    decrypted = key.decryptPublic(messageEnc, 'base64');
    // console.log("decrypted: " + decrypted);
    if(hash != decrypted){
      return false;
    }

    return true;
  }
}
