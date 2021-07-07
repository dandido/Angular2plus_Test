import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {User} from "../../../user.model";
import {Router} from "@angular/router";


export interface AuthResponseData{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registred?: boolean;
}


@Injectable({providedIn:"root"})
export class AuthService{

  private ApiKey: string = "AIzaSyCHa_vghEY1ft8ebIcabCgvqAOXCw4vS98";
  private fireBaseSignIn:string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  private fireBaseSignUp:string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="

  //store user as Subject ( login - signUp or logout)
  user = new Subject<User>();
  // @ts-ignore
  token = new BehaviorSubject<User>(null);


  constructor(private httpClient : HttpClient,
              private router:Router) { }

  logout(){
    this.token.next(null);
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  signUp(email:string, password:string){
    const url =  this.fireBaseSignUp+ this.ApiKey;
   return this.httpClient.post<AuthResponseData>(url,
      {  email, password , returnSecureToken: true
      }).pipe(catchError(this.handleError))
  }

  singIn(email:string, password:string){
    const url = this.fireBaseSignIn+ this.ApiKey;
    return this.httpClient.post<AuthResponseData>(url,
      { email, password , returnSecureToken: true
      }).pipe(catchError(this.handleError),
      tap(rst=> {
        this.handleAuth(rst.email,rst.localId,rst.idToken,+rst.expiresIn)
      }))

  }

  private handleAuth(email:string ,localId : string ,token : string , expiresIn:number){
    const expiration = new Date(new Date().getTime() + +expiresIn * 1000) // mill sec
    const user = new User(email,localId,token,expiration)
    this.user.next(user);
    this.token.next(user);
    //store the user object 'JSON' as a string
    localStorage.setItem('userData',JSON.stringify(user));
  }

  private handleError(errorRes : HttpErrorResponse){
    let errorMessage ='Unknown Error ! Please contact your administrator';
    if (!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message){
      case 'EMAIL_EXISTS' : errorMessage = 'This Email Exists déja';break;
      case 'INVALID_PASSWORD' : errorMessage = 'Invalid UserName or Password';break;
      case 'EMAIL_NOT_FOUND' : errorMessage='Invalid UserName or Password';break;
    }
    return throwError(errorMessage)

  }


  autoLogin() {
    const userData: {
      email:string,
      id:string,
      _token:string,
      _tokenExpirationDate:string
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }
    const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
    //check token expiration
    if(!loadedUser.token){
      return;
    }

    this.token.next(loadedUser);


  }
}
