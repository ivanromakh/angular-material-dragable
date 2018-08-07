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
  isLoaded = false;
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
    card.params.x = gridTile.offsetLeft + 'px';
    card.params.y = gridTile.offsetTop + 'px';
    card.params.width = gridTile.offsetWidth + 'px';
    card.params.height = gridTile.offsetHeight + 'px';
  }

  updatePosition() {
    const el = this._elementRef.nativeElement;
    this.setCardPositionForAnimation(this.card, this.getMatGridTile(el));
  }

  ngOnChanges(changes) {
    //this.updatePosition();
  }

  ngOnInit() {
    const el = this._elementRef.nativeElement;
    el.draggable = 'true';
    el.style.cursor = 'move';

    el.addEventListener('dragstart', (e) => {
      el.classList.add('drag-src');
      e.dataTransfer.effectAllowed = 'move';
    });

    el.addEventListener('dragend', (e) => {
      e.preventDefault();
      el.classList.remove('drag-src');
      this.drop.emit(this.card);
    });
    this.updatePosition();
  }
}

