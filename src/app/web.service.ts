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
  private socket;


  connect(): Rx.Subject<MessageEvent> {
    this.socket = io(environment.socketUrl);

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

}
