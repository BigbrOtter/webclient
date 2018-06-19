import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {
  isVideoCard: boolean;

chats= [
  {sender: 'henk', message:'Hello'},
  {sender: 'henk', message:'Hello'},
  {sender: 'henk', message:'Hello'},
  {sender: 'henk', message:'Hello'},
  {sender: 'henk', message:'Hello'}
]
  cards = [
    { title: 'stream_1', cols: 2, rows: 1 , isVideoCard: true},
    { title: 'stream_2', cols: 2, rows: 1 , isVideoCard: true },
    { title: 'stream_3', cols: 1, rows: 2 , isVideoCard: false },
    { title: 'stream_4', cols: 2, rows: 1 , isVideoCard: true },
    { title: 'chats', cols: 2, rows: 1 , isVideoCard: true }
  ];


}
