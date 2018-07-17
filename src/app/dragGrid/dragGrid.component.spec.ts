/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DragGridComponent } from './dragGrid.component';

describe('DragGridComponent', () => {
  let component: DragGridComponent;
  let fixture: ComponentFixture<DragGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
