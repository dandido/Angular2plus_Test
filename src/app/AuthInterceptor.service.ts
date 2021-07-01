import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //restrict it here

    // manip
    //const modifRes = req.clone({url : 'blablabla'})
    const modifRes = req.clone({headers:req.headers
        .append('test','1111')
        .append('Auth','SecretKeyDoNotPutItInTheCode'),
      params:req.params.append('azerty','qwerty')})

    console.log('REquest On tje file')
   // do not forget to return the new one
    return next.handle(modifRes).pipe(
      tap(event => {
        console.log(event);
        if (event.type === HttpEventType.Response){
          console.log('Response Has Arrived, Body data');
          console.log(event.body);
        }
      })
    );
  }
}
