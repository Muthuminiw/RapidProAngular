import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import { Observer } from 'rxjs/Observer';
import { Observable, Observer } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as socketIo from 'socket.io-client';

import { Socket } from '../shared/interfaces';

// declare var io : {
//   connect(url: string): Socket;
// };

@Injectable()
export class DataService {

  socket?: Socket;
  observer!: Observer<string>;

  getQuotes() : Observable<string> {
    this.socket = socketIo('http://localhost:4000');

    this.socket.on('exportToCsv', (res) => {
      console.log(res);
      this.observer.next(res);
    });

    return this.createObservable();
  }

  createObservable() : Observable<string> {
      return new Observable<string>(observer => {
        this.observer = observer;
      });
  }

  private handleError(error:any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
        let errMessage = error.error.message;
        return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Socket.io server error');
  }

}
