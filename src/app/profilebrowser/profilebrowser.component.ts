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

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data:any) {
    this.description = 'test';
    this.dataRef = data;
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
  }

  close(){
    this.dialog.closeAll();
  }
}
