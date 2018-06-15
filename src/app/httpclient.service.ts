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

  getUrl(){
    return this.url;
  }

  setUrl(url:string){
    this.url = url;
  }
}
