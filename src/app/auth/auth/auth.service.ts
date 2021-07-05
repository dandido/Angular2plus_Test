import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


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
      })
  }

  singIn(){
    const url = this.fireBaseSignIn+ this.ApiKey;
  }
}
