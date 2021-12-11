import { ChartComponent } from './chart.component';

import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';

describe('test my chart', () => {
  it('should draw the chart on ngAfterViewInit', () => {
    // arrange
    const r = mockRouter();
    const c = new ChartComponent(
      r,
      jasmine.createSpy('chart builder').and.returnValue('the chart')
    );
    c.canvas = new ElementRef(document.createElement('canvas'));
    // act
    c.ngAfterViewInit();
    // assert
    expect(c.chart).toBeDefined();
  });

  it('when clicked on the second point should navigate to show the selected point if it is visible', () => {
    // arrange
    const r = mockRouter();
    // arrange the onclick prerequisites
    const ch = jasmine.createSpy('chart builder');
    let onClickCallback;
    ch.and.callFake((i, o) => {
      onClickCallback = o.options.onClick;
      return {
        // mock the isVisible method
        getDataVisibility: jasmine
          .createSpy('isVisibleMockMethod')
          .and.returnValue(true),
      };
    });

    const c = new ChartComponent(r, ch);
    c.canvas = new ElementRef(document.createElement('canvas'));
    c.ngAfterViewInit();
    // act
    onClickCallback(null, [{ index: 1 }]);
    // assert
    expect(r.navigate).toHaveBeenCalledWith([2]);
  });

  it('when clicked on the second point should NOT navigate to show the selected point if it is NOT visible', () => {
    // arrange
    const r = mockRouter();
    // arrange the onclick prerequisites
    const ch = jasmine.createSpy('chart builder');
    let onClickCallback;
    ch.and.callFake((i, o) => {
      onClickCallback = o.options.onClick;
      return {
        // mock the isVisible method
        getDataVisibility: jasmine
          .createSpy('isVisibleMockMethod')
          .and.returnValue(false),
      };
    });

    const c = new ChartComponent(r, ch);
    c.canvas = new ElementRef(document.createElement('canvas'));
    c.ngAfterViewInit();
    // act
    onClickCallback(null, [{ index: 1 }]);
    // assert
    expect(r.navigate).not.toHaveBeenCalledWith([2]);
  });
});

function mockRouter(): Router {
  return <Router>(<unknown>jasmine.createSpyObj('router', ['navigate']));
}
