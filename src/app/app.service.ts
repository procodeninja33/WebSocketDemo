import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AppService {


  addedUser: Subject<any>;
  url = environment.serverUrl;
  loginUser: Subject<any>;
  logoutUser: Subject<any>;

  constructor(private webService: WebService,
    private http: HttpClient) {
    this.addedUser = this.webService.connect();
    this.loginUser = this.webService.loginUser();
    this.logoutUser = this.webService.logoutUser();
  }

  getHeader() {
    let headers = new HttpHeaders();
    const token = JSON.parse(localStorage.getItem('currunt_user'));
    headers = headers.set('authorization', token['token']);
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }


  adminLogin(data) {
    return this.http.post(this.url + 'login', data);
  }

  login(data) {
    return this.http.post(this.url + 'login', data).pipe(
      map((res: Response) => {
        if (res['status'] === 200) {
          this.loginUser.next(res['data']);
        }
        return res;
      })
    );
  }

  registerUser(data) {
    return this.http.post(this.url + 'addUser', data).pipe(
      map((res: Response) => {
        if (res['status'] === 200) {
          this.addedUser.next(res['data']);
        }
        return res;
      })
    );
  }

  getAllUser() {
    return this.http.get(this.url + 'userList', { headers: this.getHeader() });
  }

  logout(data) {
    this.logoutUser.next(data);
  }

}
