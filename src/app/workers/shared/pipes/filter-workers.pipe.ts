import {Pipe, PipeTransform} from '@angular/core';
import {Worker} from "../../../shared/models/worker.model";

@Pipe({
  name: 'filterWorkers'
})
export class FilterWorkersPipe implements PipeTransform {

  transform(workers: Worker[], filterValue: string): Worker[] {
    if (filterValue === '') {
      return workers;
    } else {
      let byName = workers.filter(
        (worker) =>
          worker.name!.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1
      );
      let bySurname = workers.filter(
        (worker) =>
          worker.surname!.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1
      );

      let filtered = byName.concat(bySurname);

      filtered = filtered.filter((item, index) => {
          return (filtered.indexOf(item) == index)
        }
      )

      return filtered;
    }
  }

}
