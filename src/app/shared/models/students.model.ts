export interface Student {
  id: number;
  surname: string;
  name: string;
  patronymic?: string;
  phone: string;
  email: string;
  birthdate: Date;
  group: string;
  program: number;
}

export enum StudentProgram {
  web,
  security,
  big_data,
  cad,
}

export let Programs = [
  'Веб-технологии',
  'Информационная безопасность',
  'Большие и открытые данные',
  'Интеграция и программирование в САПР',
];
