/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DragCardComponent } from './dragCard.component';

describe('DragCardComponent', () => {
  let component: DragCardComponent;
  let fixture: ComponentFixture<DragCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
