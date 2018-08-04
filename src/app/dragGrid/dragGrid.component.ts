import { Component, OnInit, HostBinding } from '@angular/core';
import { trigger, state, style, transition, animate } from '../../../node_modules/@angular/animations';

@Component({
  selector: 'app-drag-grid',
  templateUrl: './dragGrid.component.html',
  styleUrls: ['./dragGrid.component.css'],
  animations: [
    trigger('dragElement', [
      transition('* => *', animate(
        '500ms ease',
        style({ left: '{{left}}', top: '{{top}}'})), {params: {left: 'auto', top: 'auto'}}
      )
    ]),
    trigger('rotation', [
      transition('* => *', animate('500ms ease', style({transform: 'rotate(90)'})))
    ])
  ]
})

export class DragGridComponent implements OnInit {
  dropCard = null;
  dragDuration = 500;

  cards = [
    { title: 'Card 1', state: 'stand', params: {x: 0, y: 0}, cols: 1, rows: 1, x: 0, y: 0},
    { title: 'Card 2', state: 'stand', params: {x: 0, y: 0}, cols: 1, rows: 1, x: 0, y: 0},
    { title: 'Card 3', state: 'stand', params: {x: 0, y: 0}, cols: 1, rows: 1, x: 0, y: 0},
    { title: 'Card 4', state: 'stand', params: {x: 0, y: 0}, cols: 1, rows: 1, x: 0, y: 0}
  ];

  constructor() { }

  ngOnInit() {
  }

  onTileDrop(card) {
    this.dropCard = card;
  }

  getMatGridTile(element) {
    let tries = 10;
    while (element.tagName !== 'MAT-GRID-TILE') {
      element = element.parentElement;
      tries --;
      if (tries < 0) {
        break;
      }
    }
    return element;
  }

  setCardPositionForAnimation(card, gridTile) {
    card.params.x = gridTile.offsetLeft + 'px';
    card.params.y = gridTile.offsetTop + 'px';
  }

  onMouseDownTile() {
    console.log(123);
  }

  onMouseMoveGrid(card, event) {
    const gridTile = this.getMatGridTile(event.target);
    this.setCardPositionForAnimation(card, gridTile);

    if (!this.dropCard) {
      return;
    }

    if (card !== this.dropCard) {
      const {cards, dropCard} = this;
      card.state = !card.state;
      dropCard.state = !dropCard.state;

      card.params.left = dropCard.params.x;
      card.params.top = dropCard.params.y;

      dropCard.params.left = card.params.x;
      dropCard.params.top = card.params.y;

      setTimeout(function() {
        const hoverIndex = cards.indexOf(card);
        const dropIndex = cards.indexOf(dropCard);

        cards.splice(hoverIndex, 1, dropCard);
        cards.splice(dropIndex, 1, card);
      }, this.dragDuration);
      this.dropCard = null;
    }
    this.dropCard = null;
  }
}
