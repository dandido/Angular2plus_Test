import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  caption1: string = "Sign Up";
  caption2: string ="Switch to Login";
  isUserLoggedIn = false;
  isLoading = false;

  errorAuth: string = "";

  constructor(private authservice: AuthService) { }


  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isUserLoggedIn = ! this.isUserLoggedIn;
    this.caption2 = this.isUserLoggedIn ? "Switch to SignUp" : 'Switch to Login';


  }

  onSubmit(authRef: NgForm) {
    if(!authRef.valid){
      return;
    }
    this.errorAuth= "";
    this.isLoading = true;

    //console.log(authRef.value);
    if(!this.isUserLoggedIn){
      this.authservice.signUp(authRef.value.email,authRef.value.password).subscribe(response=> {
        console.log(response);
        this.isUserLoggedIn = true;
        this.isLoading =false;
      }, errorMessage => {
        console.log(errorMessage);
        this.errorAuth = errorMessage;
        this.isLoading =false;
      })
    }else{
      //.....
    }
    authRef.reset();

      }
}
