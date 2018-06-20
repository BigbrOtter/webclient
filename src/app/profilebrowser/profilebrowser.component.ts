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
    this.description = 'test';
    this.dataRef = data;
    this.streamCardId = this.streamCardId;
    var streamer = new Streamer();
    streamer.setName("Henk");
    streamer.setUrl("www.henk.nl");
    this.listOfStreams[0] = streamer;
    this.dialogRef = dialog;
   }

  ngOnInit() {
   this.httpClient.getAllStreams(window.localStorage.getItem("cert")).subscribe(result => {
      console.log(result);
    });

  }

  openDialog(){

  }

  onClick(resultUrl:any){
    console.log(resultUrl);

    this.dialogRef.close(resultUrl);
  }

  close(){
    this.dialogRef.close();
  }
}
