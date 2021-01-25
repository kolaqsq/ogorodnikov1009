import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StudentsRoutingModule} from './students-routing.module';
import {StudentsComponent} from './students.component';
import {StudentListComponent} from './student-list/student-list.component';
import {StudentEditComponent} from './student-edit/student-edit.component';
import {HttpClientModule} from '@angular/common/http';
import {FilterStudentsPipe} from './shared/pipes/filter-students.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrderModule} from 'ngx-order-pipe';
import {TextMaskModule} from 'angular2-text-mask';
import { FilterProgramsPipe } from './shared/pipes/filter-programs.pipe';
import { FilterGroupsPipe } from './shared/pipes/filter-groups.pipe';


@NgModule({
  declarations: [StudentsComponent, StudentListComponent, StudentEditComponent, FilterStudentsPipe, FilterProgramsPipe, FilterGroupsPipe],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    OrderModule,
    TextMaskModule,
  ],
  exports: [
    FilterStudentsPipe,
    OrderModule
  ]
})
export class StudentsModule {
}
