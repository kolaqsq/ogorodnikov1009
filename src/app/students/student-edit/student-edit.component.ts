import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Student, StudentProgram} from '../../shared/models/students.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentsService} from '../../shared/services/students.service';
import {isNullOrUndefined} from '../shared/tools/is-null-or-unfrfined';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.sass'],
})
export class StudentEditComponent implements OnInit {
  id!: number;
  student!: Student;
  studentProgram = StudentProgram;
  studentForm!: FormGroup;
  phoneMask = [
    '+',
    '7',
    ' ',
    '(',
    /[1-9]/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ];

  constructor(
    private activatedRouter: ActivatedRoute,
    private workersService: StudentsService,
    private router: Router
  ) {
    this.activatedRouter.params.subscribe((param) => {
      this.id = param.id;
    });
  }

  ngOnInit(): void {
    this.studentForm = new FormGroup({
      surname: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      patronymic: new FormControl(''),
      phone: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('\\+7 \\([0-9]{3}\\) [0-9]{3}-[0-9]{2}-[0-9]{2}'),
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      birthdate: new FormControl('', Validators.required),
      group: new FormControl('', Validators.required),
      program: new FormControl('', Validators.required),
    });
    this.getData();
  }

  async getData() {
    if (!isNullOrUndefined(this.id)) {
      try {
        const student = this.workersService.getOneById(this.id);
        this.student = await student;
      } catch (err) {
        console.error(err);
      }
      this.studentForm.patchValue({
        name: this.student.name,
        surname: this.student.surname,
        patronymic: this.student.patronymic,
        phone: this.student.phone,
        email: this.student.email,
        birthdate: this.student.birthdate,
        group: this.student.group,
        program: this.student.program,
      });
    }
  }

  async onSave() {
    if (!isNullOrUndefined(this.id)) {
      try {
        await this.workersService.putOneById(this.id, this.studentForm.value);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const res = await this.workersService.postOne(this.studentForm.value);
        await this.router.navigate([this.router.url, res.id]);
        await this.getData();
      } catch (err) {
        console.error(err);
      }
    }
  }

  async onDelete() {
    try {
      await this.workersService.deleteOneById(this.id);
    } catch (err) {
      console.error(err);
    }
    await this.router.navigate(['/students']);
  }
}
