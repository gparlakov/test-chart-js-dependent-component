import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart.component';
import { RouterModule } from '@angular/router';
import { InnerComponent } from './inner.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: ':id',
        component: InnerComponent,
        pathMatch: 'full',
      },
      {
        path: '',
        component: ChartComponent,
        pathMatch: 'full',
      },
    ]),
  ],
  declarations: [AppComponent, ChartComponent, InnerComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
