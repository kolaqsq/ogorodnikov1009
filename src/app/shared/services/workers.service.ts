import {Injectable} from '@angular/core';
import {HttpBase} from "./http-base";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WorkersService extends HttpBase {
  constructor(public http: HttpClient) {
    super(http, 'workers/');
  }
}
