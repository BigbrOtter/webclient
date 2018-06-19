import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from "@angular/material";

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

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, streamCardId: string) {
    this.description = 'test';
    this.dataRef = data;
    this.streamCardId = streamCardId;
   }

  ngOnInit() {
  }

  openDialog(){

  }

  confirmSelection(){
    this.dialog.closeAll();

    this.dialogRef.afterClosed().subscribe(result => {
      console.log("thing closed " + result)
      return result;
    });

    //Set right streamer to right chat

  }

  close(){
    this.dialog.closeAll();
  }
}
