import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() brand;
  @Input() navLinks;
  isSmall = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
    ]).subscribe(result => {
      if (result.matches) {
        this.activateSmallLayout();
      } else {
        this.deactivateSmallLayout();
      }
    });
  }

  activateSmallLayout() {
    this.isSmall = true;
  }

  deactivateSmallLayout() {
    this.isSmall = false;
  }
}
