import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardItems = [{
    header: 'Find dictionary',
    description: 'Find dictionary by searching',
    src: '/assets/images/dashboard/dictionary.png',
  }, {
    header: 'Rate dictionary',
    description: 'Rate dictionary by clicking on star',
    src: '/assets/images/dashboard/star.png',
  }, {
    header: 'Create dictionary',
    description: 'Go to your own dictinaries and create one',
    src: '/assets/images/dashboard/create.png',
  }];
  constructor() { }

  ngOnInit() {
  }

}
