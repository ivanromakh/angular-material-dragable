import { Component, OnInit, ElementRef } from '@angular/core';
import { trigger, style, transition, animate, keyframes } from '@angular/animations';
import { DragCard } from './interfaces/dragParams';

@Component({
  selector: 'app-drag-grid',
  templateUrl: './dragGrid.component.html',
  styleUrls: ['./dragGrid.component.css'],
  animations: [
    trigger('dragElement', [
      transition(
        '* => *',
        animate('{{duration}}ms ease', keyframes([
          style({ left: '{{x}}', top: '{{y}}', offset: 0 }),
          style({ left: '{{left}}', top: '{{top}}', offset: 1 }),
        ]),
      ), { params: { x: 'auto', left: 'auto', y: 'auto', top: 'auto', duration: '0'}})
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

  cards: DragCard[] = [
    { title: 'Table1', color: 'red', element: null, display: true, rotate: 0, state: false, content: {type: 'documents'}, tempParams: {}, params: {x: 'auto', y: 'auto', left: 'auto', top: 'auto'}, cols: this.baseColSize, rows: this.baseRowSize },
    { title: 'Table2', color: 'black', element: null, display: true, rotate: 0, state: false, content: {type: 'documents'}, tempParams: {}, params: {x: 'auto', y: 'auto', left: 'auto', top: 'auto'}, cols: this.baseColSize, rows: this.baseRowSize },
    { title: 'Table3', color: 'blue', element: null, display: true, rotate: 0, state: false, content: {type: 'documents'}, tempParams: {}, params: {x: 'auto', y: 'auto', left: 'auto', top: 'auto'}, cols: this.baseColSize, rows: this.baseRowSize },
    { title: 'Table4', color: 'yellow', element: null, display: true, rotate: 0, state: false, content: {type: 'documents'}, tempParams: {}, params: {x: 'auto', y: 'auto', left: 'auto', top: 'auto'}, cols: this.baseColSize, rows: this.baseRowSize },
    { title: 'Table5', color: 'pink', element: null, display: true, rotate: 0, state: false, content: {type: 'documents'}, tempParams: {}, params: {x: 'auto', y: 'auto', left: 'auto', top: 'auto'}, cols: this.baseColSize, rows: this.baseRowSize },
    { title: 'Table6', color: 'green', element: null, display: true, rotate: 0, state: false, content: {type: 'documents'}, tempParams: {}, params: {x: 'auto', y: 'auto', left: 'auto', top: 'auto'}, cols: this.baseColSize, rows: this.baseRowSize },
  ];

  constructor(private _elementRef: ElementRef) { }

  ngOnInit() {
    this.isLoaded = true;
    setTimeout(() => {
      this.setGrid();
    }, 400);
  }

  onTileDrop(card) {
    this.dropCard = card;
  }

  getElementByTagName(element, tagName) {
    let {tries} = this;
    while (element.tagName !== tagName) {
      element = element.parentElement;
      tries --;
      if (tries < 0) {
        break;
      }
    }
    return element;
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

  toggleState(card) { card.state = !card.state; }

  hideCard(card) { card.display = false; }
  showCard(card) { card.display = true; }

  setPositionX(card, value) { card.params.x = value; }
  setPositionY(card, value) { card.params.y = value; }
  setPositionLeft(card, value) { card.params.left = value; }
  setPositionTop(card, value) { card.params.top = value; }

  setAllPositions(card) {
    this.setPositionX(card, card.tempParams.x);
    this.setPositionY(card, card.tempParams.y);
    this.setPositionLeft(card, card.tempParams.left);
    this.setPositionTop(card, card.tempParams.top);
  }

  getTilePositionX(card) { return card.element.offsetLeft + 'px'; }
  getTilePositionY(card) { return card.element.offsetTop + 'px'; }
  getTileWidth(card) { return card.element.offsetWidth + 'px'; }
  getTileHeight(card) { return card.element.offsetHeight + 'px'; }

  beginAnimation(card) {
    this.setAllPositions(card);
    this.toggleState(card);
    this.showCard(card);
  }

  getParams(card1, card2) {
    card1.tempParams = {
      x: this.getTilePositionX(card2),
      y: this.getTilePositionY(card2),
      left: this.getTilePositionX(card1),
      top: this.getTilePositionY(card1)
    };
  }

  onMouseMoveGrid(card, event) {
    const {cards, dropCard} = this;

    if (!dropCard) { return; }

    if (card !== dropCard) {
      this.hideCard(card);
      this.hideCard(dropCard);

      const hoverIndex = cards.indexOf(card);
      const dropIndex = cards.indexOf(dropCard);

      cards.splice(hoverIndex, 1, dropCard);
      cards.splice(dropIndex, 1, card);

      cards.forEach((loopCard, cardNum) => {
        loopCard.tempParams = {x: this.getTilePositionX(loopCard), y: this.getTilePositionY(loopCard)};
      });

      setTimeout(() => {
        cards.forEach(loopCard => {
          loopCard.tempParams.left = this.getTilePositionX(loopCard);
          loopCard.tempParams.top = this.getTilePositionY(loopCard);
          this.beginAnimation(loopCard);
        });
      }, 70);
    }
    this.dropCard = null;
  }

  allowDrop(event) {
    event.preventDefault();
  }

  setGrid() {
    const gridList = this._elementRef.nativeElement.getElementsByTagName('MAT-GRID-LIST')[0];
    const gridTiles = gridList.getElementsByTagName('MAT-GRID-TILE');
    for (let tileNum = 0; tileNum < gridTiles.length; tileNum++) {
      const gridTile = gridTiles[tileNum];
      const number = gridTile.getAttribute('data-index');
      this.cards[number].element = gridTile;
    }
  }

  sizeChanged() {
    console.log('size changed');
  }
}
