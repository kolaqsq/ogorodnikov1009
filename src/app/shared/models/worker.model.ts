export interface Worker {
  id: number;
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  email: string;
  birthdate: Date;
  department: number;
}

export enum WorkerDepartment {
  it,
  sales,
  delivery,
  legal,
}

export let Departments = [
  'IT отдел',
  'Отдел продаж',
  'Отдел доставки',
  'Юридический отдел',
]
