import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth/auth/auth.service";
import {exhaustMap, take} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable()
export class LoggingInterceptorService implements HttpInterceptor{


  constructor(private authService: AuthService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //we need BehaviorSubject for this to work or it will be stuck at loading
    return this.authService.token.pipe(take(1),
      exhaustMap(userResponse=>{

        if(!userResponse){
          return next.handle(req);
        }
        const updateRequest = req.clone({
          params: new HttpParams().set('auth',userResponse.token)
        });
        return next.handle(updateRequest);
      })
    );

  }

}
