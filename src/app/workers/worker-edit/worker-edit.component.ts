import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Worker, WorkerDepartment } from '../../shared/models/worker.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WorkersService } from '../../shared/services/workers.service';
import { isNullOrUndefined } from '../shared/tools/is-null-or-unfrfined';

@Component({
  selector: 'app-worker-edit',
  templateUrl: './worker-edit.component.html',
  styleUrls: ['./worker-edit.component.sass'],
})
export class WorkerEditComponent implements OnInit {
  id!: number;
  worker!: Worker;
  workerDepartment = WorkerDepartment;
  workerForm!: FormGroup;
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
    private workersService: WorkersService,
    private router: Router
  ) {
    this.activatedRouter.params.subscribe((param) => {
      this.id = param.id;
    });
  }

  ngOnInit(): void {
    this.workerForm = new FormGroup({
      surname: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      patronymic: new FormControl('', Validators.required),
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
      department: new FormControl('', Validators.required),
    });
    this.getData();
  }

  async getData() {
    if (!isNullOrUndefined(this.id)) {
      try {
        let worker = this.workersService.getOneById(this.id!);
        this.worker = await worker;
      } catch (err) {
        console.error(err);
      }
      this.workerForm!.patchValue({
        name: this.worker!.name,
        surname: this.worker!.surname,
        patronymic: this.worker!.patronymic,
        phone: this.worker!.phone,
        email: this.worker!.email,
        birthdate: this.worker!.birthdate,
        department: this.worker!.department,
      });
    }
  }

  async onSave() {
    if (!isNullOrUndefined(this.id)) {
      try {
        await this.workersService.putOneById(this.id!, this.workerForm!.value);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        let res = await this.workersService.postOne(this.workerForm!.value);
        this.router.navigate([this.router.url, res.id]);
        this.getData();
      } catch (err) {
        console.error(err);
      }
    }
  }

  async onDelete() {
    try {
      await this.workersService.deleteOneById(this.id!);
    } catch (err) {
      console.error(err);
    }
    this.router.navigate(['/users']);
  }
}
