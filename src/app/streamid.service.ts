import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StreamidService {
passStreamId$: Observable<any>;
private passStreamIdSubject = new Subject<any>();

  constructor() {
    this.passStreamId$ = this.passStreamIdSubject.asObservable();
    this.passStreamId("H");
  }

  passStreamId(streamId:string){
    // console.log(streamId);
    this.passStreamIdSubject.next(streamId);
  }
}
