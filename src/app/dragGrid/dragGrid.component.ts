import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-drag-grid',
  templateUrl: './dragGrid.component.html',
  styleUrls: ['./dragGrid.component.css'],
  animations: [
    trigger('dragElement', [
      transition(
        '* => *',
        animate('500ms ease', keyframes([
          style({ left: '{{x}}', top: '{{y}}', offset: 0 }),
          style({ left: '{{left}}', top: '{{top}}', offset: 1 }),
        ]),
      ), { params: { x: 'null', left: 'null', y: 'null', top: 'null'}})
    ]),
    trigger('rotation', [
      transition(
        '* => *',
        animate('{{duration}}ms ease', style({transform: 'rotate({{rotate}}deg)', overflow: 'hidden'})),
        {params: {rotate: 0, duration: 200}}
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
  rotateDuration = 200;

  cards = [{
      title: 'Population graph',
      rotate: 0,
      display: true,
      state: false,
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
      params: {x: 0, y: 0, left: 0, top: 0, width: 0, height: 0},
      cols: this.baseColSize,
      rows: this.baseRowSize
    }, {
      title: 'Table',
      display: true,
      rotate: 0,
      state: false,
      content: {type: 'documents'},
      params: {x: 0, y: 0, left: 0, top: 0, width: 0, height: 0},
      cols: this.baseColSize,
      rows: this.baseRowSize
    }, {
      title: 'Importand data',
      rotate: 0,
      state: false,
      display: true,
      content: {type: 'text'},
      data: {text: 'users count: 2'},
      params: {x: 0, y: 0, left: 0, top: 0, width: 0, height: 0},
      cols: this.baseColSize,
      rows: this.baseRowSize
    }, {
      title: 'Card 4',
      rotate: 0,
      state: false,
      display: true,
      content: {type: 'table'},
      params: {x: 0, y: 0, left: 0, top: 0, width: 0, height: 0},
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
    card.params.x = gridTile.offsetLeft + 'px';
    card.params.y = gridTile.offsetTop + 'px';
    card.params.width = gridTile.offsetWidth + 'px';
    card.params.height = gridTile.offsetHeight + 'px';
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

  onMouseMoveGrid(card, event) {
    const gridTile = this.getMatGridTile(event.target);
    this.setCardPositionForAnimation(card, gridTile);

    if (!this.dropCard) { return; }

    if (card !== this.dropCard) {
      const {cards, dropCard} = this;
      card.display = false;
      dropCard.display = false;

      const paramsCard = {x: card.params.x, left: dropCard.params.x, y: card.params.y, top: dropCard.params.y};
      const paramsDropCard = {x: dropCard.params.x, left: card.params.x, y: dropCard.params.y, top: card.params.y};
      console.log(paramsCard, paramsDropCard);

      let hoverIndex = cards.indexOf(card);
      let dropIndex = cards.indexOf(dropCard);

      cards.splice(hoverIndex, 1, dropCard);
      cards.splice(dropIndex, 1, card);

      hoverIndex = cards.indexOf(card);
      dropIndex = cards.indexOf(dropCard);

      setTimeout(() => {
        this.cards[hoverIndex].params = paramsCard;
        this.cards[dropIndex].params = paramsDropCard;

        this.cards[hoverIndex].state = !this.cards[hoverIndex].state;
        this.cards[dropIndex].state = !this.cards[dropIndex].state;
        this.cards[hoverIndex].display = true;
        this.cards[dropIndex].display = true;
      }, 60);

      this.dropCard = null;
    }
    this.dropCard = null;
  }

  allowDrop(event) {
    event.preventDefault();
  }
}
