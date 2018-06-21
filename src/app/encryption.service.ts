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

    let key = new CryptRSA([this.prvKey, "2048"]);
    return key.encryptPrivate(encryptedMessage, 'base64');
  }

  checkMessage(message:string[], messageEnc:string){
    var hash = crypto.SHA256(JSON.stringify(message)).toString(crypto.enc.Hex);
    var pubKey = window.localStorage.getItem("public");
    var decrypted;
    let key = new CryptRSA(pubKey);

    decrypted = key.decryptPublic(messageEnc);

    if(hash != decrypted){
      return false;
    }

    return true;
  }
}
