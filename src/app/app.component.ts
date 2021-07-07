import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 // styleUrls: ['./app.component.css']
  styles :[`
  h3{
    padding: 20px;
    background-color: mistyrose;
    border :1px solid red;
  }
  `]
})
export class AppComponent implements OnInit{

  constructor(private  authService:AuthService) {

  }
  ngOnInit(): void {
    this.authService.autoLogin()
  }



}
