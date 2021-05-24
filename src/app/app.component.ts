import { Component, OnInit } from '@angular/core';
import { SocketclientService } from './services/socketclient.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'rpid-client';
    constructor(private socketcluster:SocketclientService) {
    
  }
  ngOnInit(): void {
  console.log("Inside app component ts")
  }
}
