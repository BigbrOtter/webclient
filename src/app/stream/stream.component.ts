import {Component, OnInit, Input} from '@angular/core';
import { ProfilebrowserComponent } from '../profilebrowser/profilebrowser.component';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
import { HttpclientService } from '../httpclient.service';
import { Certificate } from '../certificate';
import {VgAPI} from 'videogular2/core';
import { VgCoreModule } from 'videogular2/core';
import {StreamidService} from '../streamid.service';
import {EncryptionService} from "../encryption.service";

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

  constructor(public dialog: MatDialog, public sanitizer: DomSanitizer, private httpTest: HttpclientService, private datapasser : StreamidService, private encrypt: EncryptionService) {
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
      this.checkHash(result.url);
      this.src = result.url;
        this.datapasser.passStreamId(result.streamerId);
    });
  }

  checkHash(url) {
    this.src = url;
    let baseurl = url.substring(0, url.length - 10);
    // console.log("result.url: " + url);
    // console.log("baseurl: " + baseurl);


    this.httpTest.getTextFile(url)
      .subscribe(results => {
        let manifestarray =  results.split('\n');
        let ml = manifestarray.length;

        let latestTS = manifestarray[ml-6];
        let tsUrl = baseurl + latestTS;
        // console.log("tsurl: " + tsUrl);
        this.httpTest.getTextFile(tsUrl)
          .subscribe( tsFile => {
            // console.log("tsfile typeof");
            // console.log(typeof(tsFile));
            let ehashUrl = tsUrl + '.ehash';
            // console.log("ehashurl: " + ehashUrl);
            this.httpTest.getTextFile(ehashUrl)
              .subscribe(eHash => {
                // console.log("ehash");
                // console.log(eHash);
                console.log(this.encrypt.checkStream(tsFile, eHash))
                // console.log(eHash);
              })
          })
      });
  }
}


// let manifestarray2 = [manifestarray[ml-6], manifestarray[ml-4], manifestarray[ml-2]];
// console.log(manifestarray2);
// manifestarray2.forEach((element) => {
//   console.log(`http://37.97.244.58:8000/live/test6/${element}`);
// });
