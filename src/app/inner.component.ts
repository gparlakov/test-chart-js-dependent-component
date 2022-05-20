import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  template: `<h1>Selected</h1><p>{{ selected$ | async }}</p><a routerLink="/">back</a>`,
})
export class InnerComponent {
  selected$: Observable<string>;

  constructor(route: ActivatedRoute) {
    this.selected$ = route.paramMap.pipe(map((r) => r.get('id')!));
  }
}
