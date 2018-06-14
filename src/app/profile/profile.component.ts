import { Component, OnInit, NgModule } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  username: String
  slogan: String

  constructor(private dialog: MatDialog) {

    this.username = "Bubbles";
    this.slogan = "Another day, another chance!";
  }

  ngOnInit() {
  }

  save() {

  }

  cancel() {
    this.dialog.closeAll();
  }

  openDialog() {
    const dialogCon = new MatDialogConfig();
    dialogCon.autoFocus = true;
    dialogCon.disableClose = true;
    this.dialog.open(ProfileComponent, dialogCon);
  }
}
