import { Pipe, PipeTransform } from '@angular/core';
import {Student} from '../../../shared/models/students.model';

@Pipe({
  name: 'filterGroups'
})
export class FilterGroupsPipe implements PipeTransform {

  transform(students: Student[], filterValue: string): Student[] {
    if (filterValue === '') {
      return students;
    } else {
      return students.filter(
        (student) =>
          student.group.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1
      );
    }
  }

}
