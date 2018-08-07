import { Component, OnInit, HostBinding } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-drag-grid',
  templateUrl: './dragGrid.component.html',
  styleUrls: ['./dragGrid.component.css'],
  animations: [
    trigger('dragElement', [
      transition(
        '* => *',
        animate('500ms ease', style({ left: '{{left}}', top: '{{top}}'})),
        {params: {left: 'auto', top: 'auto'}}
      )
    ]),
    trigger('rotation', [
      transition(
        '* => *',
        animate('200ms ease', style({transform: 'rotate({{rotate}}deg)', overflow: 'hidden'})),
        {params: {rotate: 0}}
      )
    ])
  ]
})

export class DragGridComponent implements OnInit {
  dropCard = null;
  isLoaded = false;

  numberOfColumns = 2;
  rowHeight = 200;
  baseColSize = 1;
  baseRowSize = 1;

  tries = 20;

  rotateDeg = 4;
  rotateCounts = 5;
  rotateSlow = 0.5;
  dragDuration = 500;

  cards = [{
      title: 'Population graph',
      rotate: 0,
      state: 'stand',
      content: {type: 'chart'},
      data: {
        labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
        datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [2478,5267,734,784,433]
        }
        ]
      },
      params: {x: 0, y: 0, width: 0, height: 0},
      cols: this.baseColSize,
      rows: this.baseRowSize
    }, {
      title: 'Table',
      rotate: 0,
      state: 'stand',
      content: {type: 'documents'},
      params: {x: 0, y: 0, width: 0, height: 0},
      cols: this.baseColSize,
      rows: this.baseRowSize
    }, {
      title: 'Importand data',
      rotate: 0,
      state: 'stand',
      content: {type: 'text'},
      data: {text: 'users count: 2'},
      params: {x: 0, y: 0, width: 0, height: 0},
      cols: this.baseColSize,
      rows: this.baseRowSize
    }, {
      title: 'Card 4',
      rotate: 0,
      state: 'stand',
      content: {type: 'table'},
      params: {x: 0, y: 0, width: 0, height: 0},
      cols: this.baseColSize,
      rows: this.baseRowSize
    }
  ];

  constructor() { }

  ngOnInit() {
    this.isLoaded = true;
  }

  onTileDrop(card) {
    this.dropCard = card;
  }

  getMatGridTile(element) {
    let {tries} = this;
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
    card.params.x = gridTile.offsetLeft;
    card.params.y = gridTile.offsetTop;
    card.params.width = gridTile.offsetWidth;
    card.params.height = gridTile.offsetHeight;
  }

  onMouseDownTile(card) {
    if (!card.isRotating) {
      card.isRotating = true;
      if (card.rotate === 0) {
        card.rotate = this.rotateDeg;
      }
      this.rotate({count: this.rotateCounts, rotateSlow: this.rotateSlow, card: card, duration: 200, rotate: this.rotate});
    }
  }

  rotate(data) {
    if (data.count <= 0) {
      data.card.rotate = 0;
      data.card.isRotating = false;
      return;
    }

    data.card.rotate = - (Math.sign(data.card.rotate) * (Math.abs(data.card.rotate) - data.rotateSlow));
    data.count--;
    setTimeout(data.rotate, data.duration, data);
  }

  moveTileAside(card, target) {
    if (target.params.x < card.params.x) {
      card.params.left = target.params.x;
    } else {
      if (card.params.width < target.params.width) {
        card.params.left = target.params.x + target.params.width / 2;
      } else { card.params.left = target.params.x - card.params.width / 2; }
    }
    card.params.left += 'px';
  }

  moveTilesAside(card, dropCard) {
    if (card.params.width !== dropCard.params.width) {
      this.moveTileAside(dropCard, card);
      this.moveTileAside(card, dropCard);
    } else {
      card.params.left = dropCard.params.x + 'px';
      dropCard.params.left = card.params.x + 'px';
    }
  }

  moveTileUpDown(card, target) {
    if (target.params.y < card.params.y) {
      card.params.top = target.params.y;
    } else {
      if (card.params.height < target.params.height) {
        card.params.top = target.params.y + target.params.height / 2;
      } else { card.params.top = target.params.y - card.params.height / 2; }
    }
    card.params.top += 'px';
  }

  moveTilesUpDown(card, dropCard) {
    if (card.params.height !== dropCard.params.height) {
      this.moveTileUpDown(card, dropCard);
      this.moveTileUpDown(dropCard, card);
    } else {
      card.params.top = dropCard.params.y + 'px';
      dropCard.params.top = card.params.y + 'px';
    }
  }

  swapCardsPlaces(data) {
    const {cards, card, dropCard} = data;
    const hoverIndex = cards.indexOf(card);
    const dropIndex = cards.indexOf(dropCard);

    cards.splice(hoverIndex, 1, dropCard);
    cards.splice(dropIndex, 1, card);
  }

  onMouseMoveGrid(card, event) {
    const gridTile = this.getMatGridTile(event.target);
    this.setCardPositionForAnimation(card, gridTile);

    if (!this.dropCard) { return; }

    if (card !== this.dropCard) {
      const {cards, dropCard} = this;
      card.state = !card.state;
      dropCard.state = !dropCard.state;

      if (card.params.y === card.params.y) {
        this.moveTilesAside(card, dropCard);
      }
      if (card.params.x === dropCard.params.x) {
        this.moveTilesUpDown(card, dropCard);
      }

      if (card.params.height === dropCard.params.height) {
        card.params.top = dropCard.params.y + 'px';
        dropCard.params.top = card.params.y + 'px';
      }

      setTimeout(this.swapCardsPlaces, this.dragDuration, {cards: cards, card: card, dropCard: dropCard});
      this.dropCard = null;
    }
    this.dropCard = null;
  }
}
