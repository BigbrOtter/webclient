import { Component, OnInit, NgModule } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from '../app.component';
import { HttpclientService } from '../httpclient.service';
import { Profile } from '../Profile';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  username: string
  slogan: string
  image: File
  prof: Profile;
  httpClient: HttpclientService;

  constructor(private dialog: MatDialog) {

    this.username = "Bubbles";
    this.slogan = "Another day, another chance!";
  }

  ngOnInit() {
  }

  save() {
    if (this.image != null) {
      this.prof = new Profile(this.image, this.slogan);
      

    }
  }

  cancel() {
    this.dialog.closeAll();
  }

  fileChange(file) {

    try {
      this.image = file.target.files[0];
      console.log(this.image.name);

    } catch (error) {
      console.log(error);
    }
  }

  openDialog() {
    const dialogCon = new MatDialogConfig();
    dialogCon.autoFocus = true;
    dialogCon.disableClose = true;
    this.dialog.open(ProfileComponent, dialogCon);
  }
}
