import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '../../../node_modules/@angular/animations';

@Component({
  selector: 'app-drag-grid',
  templateUrl: './dragGrid.component.html',
  styleUrls: ['./dragGrid.component.css'],
  animations: [
    trigger('heroState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class DragGridComponent implements OnInit {
  hoverCard = null;
  dropCard = null;
  cards = [
    { title: 'Card 1', cols: 1, rows: 1 },
    { title: 'Card 2', cols: 1, rows: 1 },
    { title: 'Card 3', cols: 1, rows: 1 },
    { title: 'Card 4', cols: 1, rows: 1 }
  ];

  constructor() { }

  ngOnInit() {
  }

  onTileDrop(card) {
    this.dropCard = card;
  }

  onMouseMoveGrid(card) {
    this.hoverCard = card;

    if (!this.dropCard) {
      return;
    }
    if (this.hoverCard !== this.dropCard) {
      const hoverIndex = this.cards.indexOf(this.hoverCard);
      const dropIndex = this.cards.indexOf(this.dropCard);
      this.cards.splice(hoverIndex, 1, this.dropCard);
      this.cards.splice(dropIndex, 1, this.hoverCard);
      this.dropCard = null;
    }
    this.dropCard = null;
  }
}
