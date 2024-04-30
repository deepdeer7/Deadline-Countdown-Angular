import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SpDeadlineCountdownComponent } from './containers/sp-deadline-countdown/sp-deadline-countdown.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, SpDeadlineCountdownComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
