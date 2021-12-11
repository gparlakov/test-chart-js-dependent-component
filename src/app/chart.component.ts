import {
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartConfiguration, ChartItem } from 'chart.js';

export function chartBuilder(item: ChartItem, options: ChartConfiguration) {
  return new Chart(item, options);
}
const ChartBuilderToken = new InjectionToken<typeof chartBuilder>(
  'The Chart.js instance builder'
);

@Component({
  template: `<canvas #canvas width="200" height="200"></canvas>`,
  providers: [{ provide: ChartBuilderToken, useValue: chartBuilder }],
})
export class ChartComponent {
  @ViewChild('canvas')
  canvas: ElementRef;
  chart: Chart;

  constructor(
    private router: Router,
    @Inject(ChartBuilderToken) private buildChart: typeof chartBuilder
  ) {}

  ngAfterViewInit() {
    const data = [1, 2, 3, 4, 5];
    this.chart = this.buildChart(this.canvas.nativeElement, {
      type: 'line',
      data: {
        datasets: [{ data, label: '1' }],
        labels: ['1', '2', '3', '4', '5'],
      },
      options: {
        onClick: (_, [element]) => {
          if (element != null) {
            const isVisible = this.chart.getDataVisibility(element.index);
            if (isVisible) {
              this.router.navigate([data[element.index]]);
            }
          }
        },
      },
    });
  }
}
