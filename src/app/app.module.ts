import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {InfoComponent} from './info/info.component';
import {HeaderComponent} from './shared/components/header/header.component';
import { HttpClientModule } from '@angular/common/http';

import {FilterWorkersPipe} from "./workers/shared/pipes/filter-workers.pipe";
import {OrderModule} from "ngx-order-pipe";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    InfoComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // FilterWorkersPipe,
    OrderModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
