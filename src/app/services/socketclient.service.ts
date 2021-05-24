import { Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as socketCluster from 'socketcluster-client';


@Injectable({
  providedIn: 'root'
})
export class SocketclientService implements OnInit {
  channelName = "csvExpChannelbob";
  socket = socketCluster.create({
    hostname: "localhost",
    port: 8000,
  });

  // console.log("this is invocked");


  constructor(private toastr: ToastrService) {
    console.log("service constructer this is invocked");
    //subscribe to the server channel and listen for messages(notifications)
    (async () => {
      let channel = this.socket.subscribe(this.channelName);
      //send data to the  server
      // this.socket.transmit(this.channelName, "Hi Im a new client ");
      // console.log("service constructer transmitteed a message"+this.channelName);
      for await (let data of channel) {
        // ... Handle channel data.
        // alert(data + " data received from server");
             console.log("connecting to socket qqqqqqqqq  " + this.channelName);
    //   // Subscribe to a channel.
      let myChannel = this.socket.subscribe(this.channelName);
      for await (let data of myChannel) {
        console.log("from socket Client" + data.status)
        this.toastr.success('Data Exported!!', data.status, {
          timeOut: 10000,
        });
        console.log("service constructer read the msg from server a message");
      }
    }
    })();
  }

  ngOnInit(): void {


  }
}
