import { ChartComponent } from './chart.component';

import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';

describe('test my chart', () => {
  it('should draw the chart on ngAfterViewInit', () => {
    // arrange
    const r = mockRouter();
    const c = new ChartComponent(r);
    c.canvas = new ElementRef(document.createElement('canvas'));
    // act
    c.ngAfterViewInit();
    // assert
    expect(c.chart).toBeDefined();
  });

  it('when clicked on the second point should navigate to show the selected point', () => {
    // arrange
    const r = mockRouter();
    const c = new ChartComponent(r);
    c.canvas = new ElementRef(document.createElement('canvas'));
    c.ngAfterViewInit();
    // act

    // -----
    // ????? how to test this
    // -----

    // assert
    expect(r.navigate).toHaveBeenCalledWith([2]);
  });
});

function mockRouter(): Router {
  return <Router>(<unknown>jasmine.createSpyObj('router', ['navigate']));
}
