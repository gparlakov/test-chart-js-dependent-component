import { ChartComponent } from './chart.component';

import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';

describe('test my chart', () => {
  it('should draw the chart on ngAfterViewInit', () => {
    // arrange
    const c = setup().build();
    // act
    c.ngAfterViewInit();
    // assert
    expect(c.chart).toBeDefined();
  });

  it('when clicked on the second point should navigate to show the selected point if it is visible', () => {
    // arrange
    const { build, callOnClickWith, router } = setup();
    const c = build();
    c.ngAfterViewInit();
    // act
    callOnClickWith(1);
    // assert
    expect(router.navigate).toHaveBeenCalledWith([2]);
  });

  it('when clicked on the second point should NOT navigate to show the selected point if it is NOT visible', () => {
    // arrange
    const { build, callOnClickWith, router } =
      setup().withChartGetDataVisibilityReturning(false);
    const c = build();
    c.ngAfterViewInit();
    // act
    callOnClickWith(1);
    // assert
    expect(router.navigate).not.toHaveBeenCalledWith([2]);
  });
});

export function setup() {
  // common
  const router = <Router>(
    (<unknown>jasmine.createSpyObj('router', ['navigate']))
  );
  const canvas = new ElementRef(document.createElement('canvas'));

  // the chart builder
  const chartBuilder = jasmine.createSpy('chart builder');
  // the chart instance
  const chart = jasmine.createSpyObj('The chart instance', [
    'getDataVisibility',
  ]);
  let onClickCallback: Function = () => {};
  chartBuilder.and.callFake((i, o) => {
    onClickCallback = o.options.onClick;
    return chart;
  });

  const builder = {
    router,
    canvas,
    chartBuilder,
    chart,
    build: () => {
      const c = new ChartComponent(router, chartBuilder);
      c.canvas = canvas;
      return c;
    },
    callOnClickWith(index: number) {
      onClickCallback(null, [{ index }]);
    },
    withChartGetDataVisibilityReturning(b: boolean) {
      chart.getDataVisibility.and.returnValue(b);
      return builder;
    },
  };

  return builder;
}
