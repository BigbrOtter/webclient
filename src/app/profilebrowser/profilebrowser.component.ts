import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { HttpclientService } from '../httpclient.service';
import {Streamer} from '../streamer';

@Component({
  selector: 'app-profilebrowser',
  templateUrl: './profilebrowser.component.html',
  styleUrls: ['./profilebrowser.component.css']
})

export class ProfilebrowserComponent implements OnInit {
  description:string;
  dataRef:any;
  dialogRef: any;
  streamCardId: string;
  listOfStreams: Streamer[] = [];

  constructor(private dialog: MatDialogRef<ProfilebrowserComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private httpClient:HttpclientService) {
    this.dataRef = data;
    this.streamCardId = this.streamCardId;
    this.dialogRef = dialog;
   }

  ngOnInit() {
   this.httpClient.getAllStreams(window.localStorage.getItem("cert")).subscribe(result => {
      var tempResult;
      tempResult = JSON.parse(JSON.stringify(result));

      tempResult.forEach(element => {
        console.log(element);
        var temp = new Streamer();
        temp.setName(element.user.naam);
        temp.setUrl(element.url) ;
        temp.setStreamerId(element.user._id);
        this.listOfStreams.push(temp);
      });
    });

  }

  openDialog(){

  }

  onClick(resultUrl:any){
    this.dialogRef.close(resultUrl);
  }

  close(){
    this.dialogRef.close();
  }
}
