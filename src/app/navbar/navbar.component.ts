import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger(
      'showNavbar', [
        transition(':enter', [
          style({width: '0%', opacity: 0}),
          animate('500ms', style({width: '100%', opacity: 1}))
        ]),
        transition(':leave', [
          style({width: '100%', opacity: 1}),
          animate('500ms', style({width: '0%', opacity: 0}))
        ])
      ]
    )
  ]
})
export class NavbarComponent {
  @Input() brand;
  @Input() navLinks;
  isSmall: Boolean = false;
  isExpended: Boolean = false;

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

  toggleExpend() {
    this.isExpended = !this.isExpended;
  }
}
