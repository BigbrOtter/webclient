import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Certificate} from './certificate';



@Injectable({
  providedIn: 'root'
})
export class HttpclientService {

  url: string;

  constructor(private http: HttpClient) {

   }

   getStream(url:string){
     console.log("method called " + url);
     return this.http.get<Certificate>(url);
   }

   postMessage(message:string, encrypted:string, streamerId:number, cert:string){
     let body = {
       "streamer": streamerId,
       "cert": cert,
       "message": message,
       "signature":encrypted
     };

     console.log(body);
      var url = "https://bigbrotter.herokuapp.com/api/chat";

      return this.http.post(url,body);
   }

  getUrl(){
    return this.url;
  }

  setUrl(url:string){
    this.url = url;
  }
}
