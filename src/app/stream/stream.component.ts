import {Component, OnInit, Input} from '@angular/core';
import { ProfilebrowserComponent } from '../profilebrowser/profilebrowser.component';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
import { HttpclientService } from '../httpclient.service';
import { Certificate } from '../certificate';
import {VgAPI} from 'videogular2/core';
import { VgCoreModule } from 'videogular2/core';
import {StreamidService} from '../streamid.service';

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

  constructor(public dialog: MatDialog, public sanitizer: DomSanitizer, private httpTest: HttpclientService, private datapasser : StreamidService) {
    // @ts-ignore ignore ERROR
    this.comp = new ProfilebrowserComponent(dialog, this.id, httpTest);
    this.src = "";
  }

  ngOnInit() {
    //this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
    //this.src = this.url;
  }

  removeStream(){
    this.src = "";
  }

  openDialog(){
    this.dialogRef = this.dialog.open(ProfilebrowserComponent, {
      data: {id: this.id, src: this.src}
    }).afterClosed().subscribe(result =>{
      // alert(result.url);
      this.src = result.url;
      let baseurl = result.url.substring(0, result.url.length - 10);
      console.log("result.url: " + result.url);
      console.log("baseurl: " + baseurl);


      this.httpTest.getTextFile(result.url)
        .subscribe(results => {
          let manifestarray =  results.split('\n');
          let ml = manifestarray.length;

          let latestTS = manifestarray[ml-2];
          let tsUrl = baseurl + latestTS;
          this.httpTest.getTextFile(tsUrl)
            .subscribe( results2 => {

              console.log(results2);
              let ehashUrl = tsUrl + '.ehash';
              this.httpTest.getTextFile(ehashUrl)
                .subscribe(results3 => {
                  // console.log(results3);
                })
            })
        });

      this.src = result.url;
        this.datapasser.passStreamId(result.streamerId);
    });
  }
}
// let manifestarray2 = [manifestarray[ml-6], manifestarray[ml-4], manifestarray[ml-2]];
// console.log(manifestarray2);
// manifestarray2.forEach((element) => {
//   console.log(`http://37.97.244.58:8000/live/test6/${element}`);
// });
