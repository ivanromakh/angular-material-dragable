
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarNavComponent } from './side-bar-nav.component';

describe('SideBarNavComponent', () => {
  let component: SideBarNavComponent;
  let fixture: ComponentFixture<SideBarNavComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SideBarNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
