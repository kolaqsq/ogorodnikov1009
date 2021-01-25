import {Component, OnInit} from '@angular/core';
import {Programs, Student} from '../../shared/models/students.model';
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
  filterValue = '';
  orderState = false;
  orderType = 'id';
  orderId = 'ID';
  orderAge = 'Возраст';

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
  }

  getAge(student: Student) {
    const age = Math.abs(Date.now() - new Date(student.birthdate).getTime());
    return Math.floor((age / (1000 * 3600 * 24)) / 365.25);
  }

  changeOrderIdState() {
    this.orderType = 'id';
    this.orderState = !this.orderState;
    this.orderId = this.orderState ? 'ID ↑' : 'ID ↓';
    this.orderAge = 'Возраст';
  }

  changeOrderAgeState() {
    this.orderType = 'birthdate';
    this.orderState = !this.orderState;
    this.orderAge = this.orderState ? 'Возраст ↓' : 'Возраст ↑';
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
