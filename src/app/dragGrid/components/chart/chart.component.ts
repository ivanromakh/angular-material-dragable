import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() card;
  myChart;
  constructor() { }

  ngOnInit() {
    if (this.card.data) {
      this.myChart = new Chart('dynamic-chart', {
        type: 'bar',
        data: this.card.data,
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Predicted world population (millions) in 2050'
          }
        }
      });
    }
  }
}
