import { Component, OnInit, Input, Sanitizer } from '@angular/core';
import { ProfilebrowserComponent } from '../profilebrowser/profilebrowser.component';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
import { HttpclientService } from '../httpclient.service';
import { Certificate } from '../certificate';

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

  @Input() id: string;

  constructor(public dialog: MatDialog, public sanitizer:DomSanitizer, private httpTest:HttpclientService) {
    this.comp = new ProfilebrowserComponent(dialog, this.id);
    //this.src = "";
  }

  ngOnInit() {
    console.log(this.id);
    //this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
    //this.src = this.url;

    loadStream("Card 4");
  }

  test(){
    let urlTest = "https://bigbrotter.herokuapp.com/register?bsn=1&naam=kevin";

    this.httpTest.getStream(urlTest).subscribe(result => {
      this.cert = result;
      window.localStorage.clear();
      window.localStorage.setItem("private", this.cert.private);
      window.localStorage.setItem("cert", this.cert.cert);
    });
  }

  openDialog(){

    this.dialogRef = this.dialog.open(ProfilebrowserComponent, {
      data: {id: this.id, src: this.src},
      autoFocus: true
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log("thing closed " + result);
     // this.src = result;
      this.ngOnInit();
    });
  }

}
