import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
import * as rsa from 'pidcrypt';


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
    

    
    
    
    encryptedMessage = crypto.SHA256(message).toString(crypto.enc.Hex);

    console.log();
    
  


    //console.log(encryptedMessage);


  }
}
