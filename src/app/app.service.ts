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

  constructor(private wsService: WebService,
    private http: HttpClient) {
    this.addedUser = <Subject<any>>wsService.connect();
  }

  getHeader() {
    let headers = new HttpHeaders();
    const token = JSON.parse(localStorage.getItem('currunt_user'));
    headers = headers.set('authorization', token['token']);
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }


  login(data) {
    return this.http.post(this.url + 'login', data);
  }

  registerUser(data) {
    return this.http.post(this.url + 'addUser', data).pipe(
      map((res: Response) => {
        this.addedUser.next(res);
      })
    );
  }

  getAllUser() {
    return this.http.get(this.url + 'userList', { headers: this.getHeader() });
  }
}
