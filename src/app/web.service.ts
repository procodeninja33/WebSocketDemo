import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as Rx from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor() { }
  private socket = io(environment.socketUrl);


  connect(): Rx.Subject<MessageEvent> {

    const observable = new Observable(result => {
      this.socket.on('newUser', (data) => {
        result.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    const observer = {
      next: (data: Object) => {
        this.socket.emit('addedUser', JSON.stringify(data));
      },
    };
    return Rx.Subject.create(observer, observable);
  }


  loginUser(): Rx.Subject<MessageEvent> {

    const observable = new Observable(result => {
      this.socket.on('counteLogin', (data) => {
        result.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    const observer = {
      next: (data: Object) => {
        this.socket.emit('login', JSON.stringify(data));
      },
    };

    return Rx.Subject.create(observer, observable);
  }


  logoutUser(): Rx.Subject<MessageEvent> {

    const observable = new Observable(result => {
      this.socket.on('counteLogin', (data) => {
        result.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    const observer = {
      next: (data) => {
        data = JSON.parse(data);
        data = data['_id'];
        this.socket.emit('logout', JSON.stringify(data));
      },
    };

    return Rx.Subject.create(observer, observable);
  }
}
