import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ProfileComponent } from './profile/profile.component';
import { MatToolbarModule, MatCheckboxModule, MatFormFieldModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatDialogModule } from '@angular/material';
import { DashComponent } from './dash/dash.component';
import { GridsterModule } from 'angular-gridster2';
import { StreamComponent } from './stream/stream.component';
import { ProfilebrowserComponent } from './profilebrowser/profilebrowser.component';
import { ChatComponent } from './chat/chat.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material';
import { ChatTabComponent } from './chat-tab/chat-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashComponent,
    StreamComponent,
    ProfileComponent,
    ProfilebrowserComponent,
    ChatComponent,
    ChatTabComponent
  ],
  imports: [
    BrowserModule,
    GridsterModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    FormsModule,
    MatTabsModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ProfileComponent,
    ProfilebrowserComponent
  ]
})
export class AppModule { }
