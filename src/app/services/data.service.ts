import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import { Observer } from 'rxjs/Observer';
import { Observable, Observer } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as sc from 'socketcluster-client';


// const http = require('http');
// const socketClusterClient = require('socketcluster-client');
// declare var io : {
//   connect(url: string): Socket;
// };

@Injectable()
export class DataService {

  socket?: any;
 
  observer!: Observer<string>;

  // getQuotes() : Observable<string> {
  //   this.socket = socketIo.io('http://localhost:4000');

  //   this.socket.on('exportToCsv', (res) => {
  //     console.log("Message Received"+res);
  //     this.observer.next(res);
  //   });

  //   return this.createObservable();
  // }
  getQuotes() : Observable<string> {
    this.socket = sc.create({
      hostname: 'localhost',
      secure: true,
      port: 8000,
    
    });
    // socketIo.io('http://localhost:4000');

    // this.socket.on('exportToCsv', (res) => {
    //   console.log("Message Received"+res);
    //   this.observer.next(res);
    // });

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
