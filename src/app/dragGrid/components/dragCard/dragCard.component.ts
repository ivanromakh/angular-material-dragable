import { Component, OnInit, ElementRef, Input, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-drag-card',
  templateUrl: './dragCard.component.html',
  styleUrls: ['./dragCard.component.css'],
})
export class DragCardComponent implements OnInit {
  @Input() card;
  @Input() changed;
  @Output() sizeChanged = new EventEmitter();
  @Output() drop = new EventEmitter();
  isLoaded = false;
  tries = 20;

  constructor(private _elementRef: ElementRef) {}

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
  }

  updateGrid() {
    this.sizeChanged.emit();
  }
}

