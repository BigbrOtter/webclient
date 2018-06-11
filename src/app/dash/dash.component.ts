import { Component } from '@angular/core';

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
    { title: 'Card 1', cols: 2, rows: 1 , isVideoCard: true},
    { title: 'Card 2', cols: 2, rows: 1 , isVideoCard: true },
    { title: 'Card 3', cols: 1, rows: 2 , isVideoCard: false },
    { title: 'Card 4', cols: 2, rows: 1 , isVideoCard: true },
    { title: 'Card 5', cols: 2, rows: 1 , isVideoCard: true }
  ];


}
