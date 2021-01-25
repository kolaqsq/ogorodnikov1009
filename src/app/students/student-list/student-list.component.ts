import {Component, OnInit} from '@angular/core';
import {Programs, Student, StudentProgram} from '../../shared/models/students.model';
import {StudentsService} from '../../shared/services/students.service';
import {Router} from '@angular/router';
import {isNullOrUndefined} from '../shared/tools/is-null-or-unfrfined';


@Component({
  selector: 'app-worker-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.sass']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  programs = Programs;
  studentProgram = StudentProgram;
  searchValue = '';
  programValue = null;
  groupValue = '';
  orderState = false;
  orderType = 'surname';
  orderId = 'ID';
  orderSurname = 'Студент';
  groups: (Student | undefined)[] = [];

  constructor(private studentsService: StudentsService, private router: Router) {
  }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    try {
      const users = this.studentsService.getAll();
      this.students = isNullOrUndefined(await users) ? [] : await users;
    } catch (err) {
      console.error(err);
    }
    this.groups = Array.from(new Set(this.students.map(a => a.group)))
      .map(group => {
        return this.students.find(a => a.group === group);
      });
  }

  changeOrderIdState() {
    this.orderType = 'id';
    this.orderState = !this.orderState;
    this.orderId = this.orderState ? 'ID ↑' : 'ID ↓';
    this.orderSurname = 'Студент';
  }

  changeOrderSurnameState() {
    this.orderType = 'surname';
    this.orderState = !this.orderState;
    this.orderSurname = this.orderState ? 'Студент ↓' : 'Студент ↑';
    this.orderId = 'ID';
  }

  onLinkProfile(id: number) {
    this.router.navigate([this.router.url, 'profile', id]);
  }

  onAddProfile() {
    this.router.navigate([this.router.url, 'profile']);
  }

  async onDelete(id: number) {
    try {
      await this.studentsService.deleteOneById(id);
    } catch (err) {
      console.error(err);
    } finally {
      await this.getData();
    }
  }
}
