import {Component, OnInit} from '@angular/core';
import {Departments, Worker} from "../../shared/models/worker.model";
import {WorkersService} from "../../shared/services/workers.service";
import {Router} from "@angular/router";
import {isNullOrUndefined} from "../shared/tools/is-null-or-unfrfined";


@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.sass']
})
export class WorkerListComponent implements OnInit {
  workers: Worker[] = [];
  departments = Departments
  filterValue = '';
  orderState = false;
  orderType = 'id';
  orderId = 'ID';
  orderAge = 'Возраст';

  constructor(private workersService: WorkersService, private router: Router) {
  }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    try {
      let users = this.workersService.getAll();
      this.workers = isNullOrUndefined(await users) ? [] : await users;
    } catch (err) {
      console.error(err);
    }
  }

  getAge(worker: Worker) {
    let age = Math.abs(Date.now() - new Date(worker.birthdate).getTime());
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
    this.router.navigate([this.router.url, 'profile', id!]);
  }

  onAddProfile() {
    this.router.navigate([this.router.url, 'profile']);
  }

  async onDelete(id: number) {
    try {
      await this.workersService.deleteOneById(id);
    } catch (err) {
      console.error(err);
    } finally {
      await this.getData();
    }
  }
}
