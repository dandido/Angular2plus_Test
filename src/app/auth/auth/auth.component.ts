import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

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
  SingUpOkey:string = ""

  errorAuth: string = "";

  constructor(private authservice: AuthService , private router:Router) { }


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
    this.SingUpOkey ="";

    let authObservable : Observable<AuthResponseData>;

    //console.log(authRef.value);
    if(!this.isUserLoggedIn){
      authObservable = this.authservice.signUp(authRef.value.email,authRef.value.password);
    }else{
      authObservable = this.authservice.singIn(authRef.value.email,authRef.value.password);
    }

    authObservable.subscribe(response=> {
      console.log(response);
      this.isUserLoggedIn = true;
      this.isLoading =false;
      this.SingUpOkey = "Success"
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      this.errorAuth = errorMessage;
      this.isLoading =false;
    })



    authRef.reset();

      }

  onHandleErrorClose() {
    this.errorAuth = "";
  }
}
