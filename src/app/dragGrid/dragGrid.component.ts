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
  setXPosition(card, value) { card.params.left = value + 'px'; }
  setYPosition(card, value) { card.params.top = value + 'px'; }

  setAutoPositions(card) {
    card.params.left = 'auto';
    card.params.top = 'auto';
  }

  exchangeXPosition(card1, card2) {
    this.setXPosition(card1, card2.params.x);
    this.setXPosition(card2, card1.params.x);
  }

  exchangeYPosition(card1, card2) {
    this.setYPosition(card1, card2.params.y);
    this.setYPosition(card2, card1.params.y);
  }

  moveTileAside(card, target) {
    if (target.params.x < card.params.x) {
      this.setXPosition(card, target.params.x);
    } else {
      if (card.params.width < target.params.width) {
        this.setXPosition(card, target.params.x + target.params.width / 2);
      } else {
        this.setXPosition(card, target.params.x - card.params.width / 2);
      }
    }
  }

  moveAsideDifferentWidth(card, dropCard) {
    if (card.rowNumber !== dropCard.rowNumber) {
      let tempCardColNum = 0;
      let tempDropCardColNum = 0;
      const cardIndex = this.cards.indexOf(card);
      const dropCardIndex = this.cards.indexOf(dropCard);

      for (let i = 0; i < this.cards.length; i++) {
        const loopCard = this.cards[i];
        if (loopCard.rowNumber === card.rowNumber && i < cardIndex) {
          tempCardColNum += loopCard.cols;
        }
        if (loopCard.rowNumber === dropCard.rowNumber && i < dropCardIndex) {
          tempDropCardColNum += loopCard.cols;
        }
      }
      console.log(tempCardColNum);

      if (tempCardColNum > this.numberOfColumns - dropCard.cols) {
        this.setXPosition(card, dropCard.params.x + dropCard.params.width);
        this.setXPosition(dropCard, dropCard.params.x);
        dropCard.overflowX = true;
      } else if (tempDropCardColNum > this.numberOfColumns - card.cols) {
        this.setXPosition(dropCard, card.params.x + card.params.width);
        this.setXPosition(card, card.params.x);
        card.overflowX = true;
      } else {
        this.exchangeXPosition(card, dropCard);
      }
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
      this.exchangeXPosition(card, dropCard);
    }
  }

  moveTileUpDown(card, target) {
    if (card.notMovingUpDown === true) {
      card.notMovingUpDown = false;
      return;
    }
    if (target.params.y < card.params.y) {
      this.setYPosition(card, target.params.y);
    } else {
      if (card.params.height < target.params.height) {
        this.setYPosition(card, target.params.y + target.params.height / 2);
      } else {
        this.setYPosition(card, target.params.y - card.params.height / 2);
      }
    }
  }

  moveTilesUpDown(card, dropCard) {
    if (card.params.height !== dropCard.params.height) {
      this.moveTileUpDown(card, dropCard);
      this.moveTileUpDown(dropCard, card);
    } else {
      if (card.overflowX) {
        this.setYPosition(dropCard, card.params.y);
        this.setYPosition(card, card.params.y);
      } else if (dropCard.overflowX) {
        this.setYPosition(card, dropCard.params.y);
        this.setYPosition(dropCard, dropCard.params.y);
      } else if (!card.overflowX && !dropCard.overflowX) {
        this.exchangeYPosition(card, dropCard);
      }
    }
  }

  setLeftMoveWithDifferentWidth(card, card1, card2) {
    this.setXPosition(card, card.params.x +  card1.params.width - card2.params.width);
    this.setYPosition(card, card.params.y);
    card.isMoved = true;
  }

  moveOtherTilesInOneRow(card, dropCard, cards, cardIndex, dropCardIndex) {
    if (Math.abs(cardIndex - dropCardIndex) > 1) {
      if (card.params.width !== dropCard.params.width) {
        const min = Math.min(cardIndex, dropCardIndex);
        const max = Math.max(cardIndex, dropCardIndex);
        for (let i = min + 1; i < max; i++) {
          cards[i].state = !cards[i].state;
          if (cardIndex > dropCardIndex) {
            this.setLeftMoveWithDifferentWidth(cards[i], card, dropCard);
          } else {
            this.setLeftMoveWithDifferentWidth(cards[i], dropCard, card);
          }
        }
      }
    }
  }

  moveCardRow(movedCard, card, dropCard, cardNum, cardIndex) {
    if (cardNum > cardIndex) {
      movedCard.state = !movedCard.state;
      this.setLeftMoveWithDifferentWidth(movedCard, dropCard, card);
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
          if (!card.overflowX) {
            this.moveCardRow(movedCard, card, dropCard, cardNum, cardIndex);
          } else {
            // not very good
            this.moveCardRow(movedCard, dropCard, card, cardNum, dropCardIndex);
          }
        } else if (movedCard.rowNumber === dropCard.rowNumber) {
          if (!dropCard.overflowX) {
            this.moveCardRow(movedCard, dropCard, card, cardNum, dropCardIndex);
          } else {
            // not very good
            this.moveCardRow(movedCard, card, dropCard, cardNum, dropCardIndex);
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
    this.moveTilesAside(card, dropCard);
    this.moveOtherTiles(card, dropCard, cards);
    this.moveTilesUpDown(card, dropCard);

    card.overflowX = false;
    dropCard.overflowX = false;
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
