import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {AlertComponentComponent} from "../../alert-component/alert-component.component";
import {PlaceHolderErrorDirective} from "../../place-holder-error.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit , OnDestroy{
  caption1: string = "Sign Up";
  caption2: string ="Switch to Login";
  isUserLoggedIn = false;
  isLoading = false;
  SingUpOkey:string = ""
  errorAuth: string = "";

  //dynamic component
  @ViewChild(PlaceHolderErrorDirective, {static:false}) alerPtHolder : PlaceHolderErrorDirective;
  //store the sub
  ComponentRefSub : Subscription;
  constructor(private authservice: AuthService , private router:Router, private componentFactoryResolver : ComponentFactoryResolver) { }


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
      this.showErrorAlert(errorMessage);
      this.isLoading =false;
    })
    authRef.reset();
  }

  onHandleErrorClose() {
    this.errorAuth = "";
  }

  private showErrorAlert(errorMessage:string ){
    const alertCmp = this.componentFactoryResolver.resolveComponentFactory(AlertComponentComponent);
    const hostViewCRef= this.alerPtHolder.viewContainerRef;
    hostViewCRef.clear();

    //interract with the component
    const componentRef = hostViewCRef.createComponent(alertCmp);
    //get the current instance
    componentRef.instance.message = errorMessage;
    this.ComponentRefSub = componentRef.instance.close.subscribe(()=> {
      this.ComponentRefSub.unsubscribe();
      this.onHandleErrorClose();
      hostViewCRef.clear();
    });

  }

  ngOnDestroy(): void {
    if (this.ComponentRefSub){
      this.ComponentRefSub.unsubscribe();
    }
  }
}
