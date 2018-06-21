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
  }

  ngOnInit() {
    //this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
    //this.src = this.url;

    // this.httpTest.getTextFile('http://37.97.244.58:8000/live/test6/index.m3u8')
    //   .subscribe(results => {
    //     let manifestarray =  results.split('\n');
    //     let ml = manifestarray.length;
    //     // let manifestarray2 = [manifestarray[ml-6], manifestarray[ml-4], manifestarray[ml-2]];
    //     // console.log(manifestarray2);
    //     // manifestarray2.forEach((element) => {
    //     //   console.log(`http://37.97.244.58:8000/live/test6/${element}`);
    //     // });
    //     let latestTS = manifestarray[ml-2];
    //     console.log(`http://37.97.244.58:8000/live/test6/${latestTS}`);
    //     this.httpTest.getTextFile(`http://37.97.244.58:8000/live/test6/${latestTS}`)
    //       .subscribe( results2 => {
    //         // console.log(results2);
    //         this.httpTest.getTextFile(`http://37.97.244.58:8000/live/test6/${latestTS + '.ehash'}`)
    //           .subscribe(results3 => {
    //             console.log(results3);
    //           })
    //       })
    //   });
  }

  openDialog(){
    this.dialogRef = this.dialog.open(ProfilebrowserComponent, {
      data: {id: this.id, src: this.src}
    }).afterClosed().subscribe(result =>{
      this.src = result;
    });
  }

}
