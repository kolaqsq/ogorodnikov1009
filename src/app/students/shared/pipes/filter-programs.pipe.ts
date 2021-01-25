import {Pipe, PipeTransform} from '@angular/core';
import {Student} from '../../../shared/models/students.model';

@Pipe({
  name: 'filterPrograms'
})
export class FilterProgramsPipe implements PipeTransform {

  transform(students: Student[], filterValue: number | null): Student[] {
    if (filterValue === null) {
      return students;
    } else {
      return students.filter(
        (student) =>
          student.program === filterValue
      );
    }
  }

}
