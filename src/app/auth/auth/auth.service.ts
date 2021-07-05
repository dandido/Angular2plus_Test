import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";


interface AuthResponseData{
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,

}


@Injectable({providedIn:"root"})
export class AuthService{

  private ApiKey: string = "AIzaSyCHa_vghEY1ft8ebIcabCgvqAOXCw4vS98";
  private fireBaseSignIn:string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  private fireBaseSignUp:string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="

  constructor(private httpClient : HttpClient) { }

  signUp(email:string, password:string){
    const url =  this.fireBaseSignUp+ this.ApiKey;
   return this.httpClient.post<AuthResponseData>(url,
      {
        email, password , returnSecureToken: true
      }).pipe(catchError(errorRes=>{
        let errorMessage ='';
        if (!errorRes.error || !errorRes.error.error){
          return throwError(errorMessage);
        }
        switch (errorRes.error.error.message){
          case 'EMAIL_EXISTS' : errorMessage = 'This Email Exists déja';

        }
     return throwError(errorMessage)

   }))
  }

  singIn(){
    const url = this.fireBaseSignIn+ this.ApiKey;
  }
}
