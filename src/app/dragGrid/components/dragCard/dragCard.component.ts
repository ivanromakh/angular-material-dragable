import { Component, OnInit, ElementRef, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-drag-card',
  templateUrl: './dragCard.component.html',
  styleUrls: ['./dragCard.component.css'],
})
export class DragCardComponent implements OnInit {
  @Input() card;
  @Output() drop = new EventEmitter();

  constructor(private _elementRef: ElementRef) {}

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
  }
}

