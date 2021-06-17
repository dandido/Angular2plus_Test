import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-servers]',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  serverNames = ['test12'];
  serverName ='';
  constructor() { }

  ngOnInit(): void {
  }
  onCreateServer(){
    this.serverNames.push(this.serverName);
  }
}
