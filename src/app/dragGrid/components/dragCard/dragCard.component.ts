import { Component, OnInit, ElementRef, Input, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-drag-card',
  templateUrl: './dragCard.component.html',
  styleUrls: ['./dragCard.component.css'],
})
export class DragCardComponent implements OnInit, OnChanges {
  @Input() card;
  @Input() changed;
  @Output() drop = new EventEmitter();
  @Output() sizeChanged = new EventEmitter();

  tries = 20;

  constructor(private _elementRef: ElementRef) {}

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

  updateRows() {
    this.sizeChanged.emit(this.card);
  }

  ngOnChanges() {
    const gridTile = this.getMatGridTile(this._elementRef.nativeElement);
    this.setCardPositionForAnimation(this.card, gridTile);
  }

  ngOnInit() {
    const el = this._elementRef.nativeElement;
    el.draggable = 'true';

    el.addEventListener('dragstart', (e) => {
      el.classList.add('drag-src');
      e.dataTransfer.effectAllowed = 'move';
    });

    el.addEventListener('dragend', (e) => {
      e.preventDefault();
      el.classList.remove('drag-src');
      this.drop.emit(this.card);
    });

    setTimeout(() => {
      this.ngOnChanges();
      console.log(this.card.params);
    }, 600);
  }
}

