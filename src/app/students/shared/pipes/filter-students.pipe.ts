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
      const byName = students.filter(
        (student) =>
          student.name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1
      );
      const bySurname = students.filter(
        (student) =>
          student.surname.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1
      );

      let filtered = byName.concat(bySurname);

      filtered = filtered.filter((item, index) => {
          return (filtered.indexOf(item) === index);
        }
      );

      return filtered;
    }
  }

}
