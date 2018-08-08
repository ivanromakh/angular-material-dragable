import { Component, OnInit, HostBinding, ElementRef } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-drag-grid',
  templateUrl: './dragGrid.component.html',
  styleUrls: ['./dragGrid.component.css'],
  animations: [
    trigger('dragElement', [
      transition(
        '* => *',
        animate('{{duration}}ms ease', style({ left: '{{left}}', top: '{{top}}'})),
        {params: {left: 'auto', top: 'auto', duration: '500'}}
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

  numberOfColumns = 4;
  rowHeight = 200;
  baseColSize = 1;
  baseRowSize = 1;

  baseDropElement = 'MAT-GRID-TILE';

  tries = 20;

  rotateDeg = 4;
  rotateCounts = 5;
  rotateSlow = 0.5;
  dragDuration = 1000;

  cards = [{
      title: 'Population graph',
      rotate: 0,
      state: 'stand',
      content: {type: 'text'},
      data: {text: 'users count: 4'},
      params: {x: 0, y: 0, width: 0, height: 0, left: 'auto', top: 'auto'},
      cols: this.baseColSize,
      rows: this.baseRowSize,
      rowNumber: 0,
      toggleDragged: false,
    }, {
      title: 'Table',
      rotate: 0,
      state: 'stand',
      content: {type: 'text'},
      data: {text: 'users count: 2'},
      params: {x: 0, y: 0, width: 0, height: 0, left: 'auto', top: 'auto'},
      cols: this.baseColSize,
      rows: this.baseRowSize,
      rowNumber: 0,
      toggleDragged: false,
    }, {
      title: 'Importand data',
      rotate: 0,
      state: 'stand',
      content: {type: 'text'},
      data: {text: 'users count: 2'},
      params: {x: 0, y: 0, width: 0, height: 0, left: 'auto', top: 'auto'},
      cols: this.baseColSize,
      rows: this.baseRowSize,
      rowNumber: 0,
      toggleDragged: false,
    }, {
      title: 'Text 1',
      rotate: 0,
      state: 'stand',
      content: {type: 'text'},
      data: {text: 'users count: 2'},
      params: {x: 0, y: 0, width: 0, height: 0, left: 'auto', top: 'auto'},
      cols: this.baseColSize,
      rows: this.baseRowSize,
      rowNumber: 0,
      toggleDragged: false,
    }, {
      title: 'Text 2',
      rotate: 0,
      state: 'stand',
      content: {type: 'text'},
      data: {text: 'users count: 2'},
      params: {x: 0, y: 0, width: 0, height: 0, left: 'auto', top: 'auto'},
      cols: this.baseColSize,
      rows: this.baseRowSize,
      rowNumber: 0,
      toggleDragged: false,
    }, {
      title: 'Text 3',
      rotate: 0,
      state: 'stand',
      content: {type: 'text'},
      data: {text: 'users count: 2'},
      params: {x: 0, y: 0, width: 0, height: 0, left: 'auto', top: 'auto'},
      cols: this.baseColSize,
      rows: this.baseRowSize,
      rowNumber: 0,
      toggleDragged: false,
    }
  ];

  constructor(private _elementRef: ElementRef) { }

  ngOnInit() {
    setTimeout(() => {
      this.updateRowNumbers(this.cards);
      this.isLoaded = true;
    }, 300);
  }

  onTileDrop(card) {
    this.dropCard = card;
  }

  getMatGridTile(element) {
    let {tries} = this;
    while (element.tagName !== this.baseDropElement) {
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

  /* MOVING TILES */
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

  moveAsideDifferentWidth(card, dropCard) {
    if (card.rowNumber !== dropCard.rowNumber) {
      card.params.left = dropCard.params.x + 'px';
      dropCard.params.left = card.params.x + 'px';
    } else {
      this.moveTileAside(dropCard, card);
      this.moveTileAside(card, dropCard);
    }
  }

  moveTilesAside(card, dropCard) {
    delete card.params.left;
    delete dropCard.params.left;
    if (card.params.width !== dropCard.params.width) {
      this.moveAsideDifferentWidth(card, dropCard);
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

  moveOtherTilesInOneRow(card, dropCard, cards, cardIndex, dropCardIndex) {
    if (Math.abs(cardIndex - dropCardIndex) > 1) {
      if (card.params.width !== dropCard.params.width) {
        console.log('move others tiles in one row with different width');
        const min = Math.min(cardIndex, dropCardIndex);
        const max = Math.max(cardIndex, dropCardIndex);
        for (let i = min + 1; i < max; i++) {
          cards[i].state = !cards[i].state;
          if (cardIndex > dropCardIndex) {
            cards[i].params.left = cards[i].params.x +  card.params.width - dropCard.params.width + 'px';
          } else {
            cards[i].params.left = cards[i].params.x + dropCard.params.width - card.params.width + 'px';
          }
          cards[i].isMoved = true;
        }
      }
    }
  }

  moveOtherTilesInDifferentRows(card, dropCard, cards, cardIndex, dropCardIndex) {
    if (card.params.width !== dropCard.params.width) {
      const min = Math.min(cardIndex, dropCardIndex);
      const max = Math.max(cardIndex, dropCardIndex);

      for (let cardNum = min + 1; cardNum < cards.length; cardNum++) {
        if (cardNum === max) { continue; }
        const movedCard = cards[cardNum];
        if (movedCard.rowNumber === card.rowNumber) {
          if (cardNum > cardIndex) {
            movedCard.state = !movedCard.state;
            movedCard.params.left = movedCard.params.x + dropCard.params.width -  card.params.width + 'px';
            movedCard.params.top =  movedCard.params.y + 'px';
            movedCard.isMoved = true;
          }
        } else if (movedCard.rowNumber === dropCard.rowNumber) {
          if (cardNum > dropCardIndex) {
            movedCard.state = !movedCard.state;
            movedCard.params.left = movedCard.params.x + card.params.width - dropCard.params.width + 'px';
            movedCard.params.top =  movedCard.params.y + 'px';
            movedCard.isMoved = true;
          }
        }
      }
    }
  }

  moveOtherTiles(card, dropCard, cards) {
    const cardIndex = cards.indexOf(card);
    const dropCardIndex = cards.indexOf(dropCard);

    if (card.rowNumber === dropCard.rowNumber) {
      this.moveOtherTilesInOneRow(card, dropCard, cards, cardIndex, dropCardIndex);
    } else {
      this.moveOtherTilesInDifferentRows(card, dropCard, cards, cardIndex, dropCardIndex);
    }
  }

  movingTiles(card, dropCard, cards) {
    this.moveOtherTiles(card, dropCard, cards);
    this.moveTilesAside(card, dropCard);
    this.moveTilesUpDown(card, dropCard);
  }

  /* DRAG AND DROP STUFF */
  swapCardsPlaces(data) {
    const {cards, card, dropCard} = data;
    const hoverIndex = cards.indexOf(card);
    const dropIndex = cards.indexOf(dropCard);

    cards.splice(hoverIndex, 1, dropCard);
    cards.splice(dropIndex, 1, card);
    card.toggleDragged = !card.toggleDragged;
    dropCard.toggleDragged = !dropCard.toggleDragged;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].isMoved) {
        cards[i].toggleDragged = !cards[i].toggleDragged;
        cards[i].isMoved = false;
      }
    }
    data.updateRowNumbers(cards);
    setTimeout(() => {
      data.updateRowNumbers(cards);
    }, 200);
  }

  onMouseMoveGrid(card, event) {
    const gridTile = this.getMatGridTile(event.target);
    this.setCardPositionForAnimation(card, gridTile);

    if (!this.dropCard) { return; }

    if (card !== this.dropCard) {
      const {cards, dropCard} = this;

      card.state = !card.state;
      dropCard.state = !dropCard.state;

      this.movingTiles(card, dropCard, cards);

      setTimeout(
        this.swapCardsPlaces,
        this.dragDuration,
        {cards: cards, card: card, dropCard: dropCard, updateRowNumbers: this.updateRowNumbers.bind(this)}
      );
    }
    this.dropCard = null;
  }

  updateRowNumbers(cards) {
    if (!cards) { cards = this.cards; }
    const grid = this._elementRef.nativeElement.getElementsByTagName(this.baseDropElement);
    let tempRowNum = 1;
    let tempColNum = 0;
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      tempColNum += card.cols;
      if (tempColNum > this.numberOfColumns) {
        tempRowNum++;
        tempColNum = card.cols;
      }
      card.rowNumber = tempRowNum;
      const gridTile = grid[i];
      this.setCardPositionForAnimation(card, gridTile);
    }
  }
}
