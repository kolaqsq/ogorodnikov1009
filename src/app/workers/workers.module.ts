import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WorkersRoutingModule} from './workers-routing.module';
import {WorkersComponent} from './workers.component';
import {WorkerListComponent} from './worker-list/worker-list.component';
import {WorkerEditComponent} from './worker-edit/worker-edit.component';
import {HttpClientModule} from "@angular/common/http";
import {FilterWorkersPipe} from './shared/pipes/filter-workers.pipe';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OrderModule} from "ngx-order-pipe";
import {TextMaskModule} from "angular2-text-mask";


@NgModule({
  declarations: [WorkersComponent, WorkerListComponent, WorkerEditComponent, FilterWorkersPipe],
  imports: [
    CommonModule,
    WorkersRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    OrderModule,
    TextMaskModule,
  ],
  exports: [
    FilterWorkersPipe,
    OrderModule
  ]
})
export class WorkersModule {
}
