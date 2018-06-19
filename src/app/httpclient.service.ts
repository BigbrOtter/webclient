import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Certificate } from './certificate';
import { Profile } from './profile';
import { catchError, tap } from 'rxjs/operators';



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

  getUrl(){
    return this.url;
  }

  setUrl(url:string){
    this.url = url;
  }
}
