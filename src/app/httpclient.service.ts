import { Injectable } from '@angular/core';
import { Certificate } from './certificate';
import { Profile } from './profile';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';



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

   postProfileDetails(url: string, profile: Profile) {
     console.log("Posting profile data. Image and slogan");


     try {
       return this.http.post<Profile>(url, profile).pipe(

       );
     } catch (error) {
       this.handleError('postProfileDetails', profile);
     }

   }

   handleError(method: string, object: Object) {
     console.log("Method " + method + " encountered an error. Object: " + object.toString());
   }

   postMessage(message:string, encrypted:string, streamerId:number, cert:string){
     let body = {
       "streamer": streamerId,
       "cert": cert,
       "message": message,
       "signature":encrypted
     };
      var url = "https://bigbrotter.herokuapp.com/api/chat";

      return this.http.post(url,body);
   }

   getChat(timeStamp:string, streamerId:number, cert:string){
    var url = "https://bigbrotter.herokuapp.com/api/chat";

     const httpOptions = {
      headers: new HttpHeaders({
        'cert': cert,
        'timeStamp': timeStamp,
        'streamer': streamerId.toString()
      })
    };

     return this.http.get(url, httpOptions);
   }

  getUrl(){
    return this.url;
  }

  setUrl(url:string){
    this.url = url;
  }
}
