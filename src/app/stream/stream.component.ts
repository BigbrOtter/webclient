import { Component, OnInit, Input, Sanitizer } from '@angular/core';
import { ProfilebrowserComponent } from '../profilebrowser/profilebrowser.component';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
import { HttpclientService } from '../httpclient.service';
import { Certificate } from '../certificate';
import { VgCoreModule } from 'videogular2/core';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {
  src : string;
  comp : ProfilebrowserComponent;
  dataRef:any;
  dialogRef: any;
  url:any;
  cert: Certificate;
  streamNumber: string;

  @Input() id: string;

  constructor(public dialog: MatDialog, public sanitizer: DomSanitizer, private httpTest: HttpclientService) {
    // @ts-ignore ignore ERROR
    this.comp = new ProfilebrowserComponent(dialog, this.id, httpTest);
    //this.src = "";
    this.src = "http://37.97.244.58:8000/live/test6/index.m3u8";
  }

  ngOnInit() {
    //this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
    //this.src = this.url;

  }

  openDialog(){
    this.dialogRef = this.dialog.open(ProfilebrowserComponent, {
      data: {id: this.id, src: this.src}
    }).afterClosed().subscribe(result =>{
      
    });
  }

}
