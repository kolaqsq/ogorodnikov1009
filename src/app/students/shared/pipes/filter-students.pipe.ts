import {Pipe, PipeTransform} from '@angular/core';
import {Student} from '../../../shared/models/students.model';

@Pipe({
  name: 'filterStudents'
})
export class FilterStudentsPipe implements PipeTransform {

  transform(students: Student[], filterValue: string): Student[] {
    if (filterValue === '') {
      return students;
    } else {
      return students.filter(
        (student) =>
          student.surname.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1
      );
    }
  }

}
