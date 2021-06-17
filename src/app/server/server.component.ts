import {Component, OnInit} from "@angular/core";

@Component({
  selector: '.app-server',
  templateUrl: './server.component.html',
  styles:[`
    .online {
      color: indigo;
    }
  `]
})

export class ServerComponent implements  OnInit{
  idServer : number = 111;
  idComponent: string = "at the end.";

  allowNewServer:boolean = false;
  serverCreationStatus ='No Server was created';
  serverName = "";
  serverCreated = false;
  serverStatus:string = 'offline';
  getServerStatus(){
    return "cuz it's gonna be a string "+ this.idComponent + this.serverStatus;
  }

  ngOnInit(): void {
  }

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    } ,2000)
  this.serverStatus = Math.random() > 0.5 ? 'OnLine':'oFFlINE';
  }

  onCreateServer(){
    this.serverCreated = true;
    this.serverCreationStatus = 'Server was created  ' + this.serverName;
  }
  onUpdateServerName(e:Event){
   this.serverName =(<HTMLInputElement>e.target).value;
  }

  getColor() {
  return this.serverStatus ==='OnLine' ? 'yellow' : 'pink';
  }
}
