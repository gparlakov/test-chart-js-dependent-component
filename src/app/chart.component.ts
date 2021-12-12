import {
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartConfiguration, ChartItem } from 'chart.js';

@Component({
  template: `<canvas #canvas width="200" height="200"></canvas>`,
})
export class ChartComponent {
  @ViewChild('canvas')
  canvas: ElementRef | undefined;
  chart: Chart | undefined;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    const data = [1, 2, 3, 4, 5];
    this.chart = new Chart(this.canvas?.nativeElement, {
      type: 'line',
      data: {
        datasets: [{ data, label: '1' }],
        labels: ['1', '2', '3', '4', '5'],
      },
      options: {
        onClick: (_, [element]) => {
          if (element != null) {
            this.router.navigate([data[element.index]]);
          }
        },
      },
    });
  }
}
