import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Observer, Subscription} from "rxjs";
import {count, map} from "rxjs/operators";
import {AuthService} from "../auth/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  constructor(private authservice: AuthService) {

  }

  isAuthUser= false;
  private userSub : Subscription;
  private firstSubcustomObservable: Subscription;
  ngOnInit(): void {

    //user connecté
    this.userSub = this.authservice.token.subscribe(user=>{
      //this.isAuthUser = !user? false: true;
      this.isAuthUser = !!user;
    });


    const customObservable = new Observable((observer) => {
      let count = 0;
      setInterval(()=> {
        observer.next(count);
        if ( count ===2 ){
          observer.complete();
        }
        if (count> 3){
          observer.error(new Error("shit happens"));
        }
        count ++ ;
      },1000);
    });

    const secondSub = customObservable.pipe(map (data => {
      return 'Round: '+ data
    }));

    this.firstSubcustomObservable = secondSub.subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error.message);
      alert(error.message);
    },() => {
      console.log("Done");
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.firstSubcustomObservable.unsubscribe();
  }


  onLogOut() {
    this.authservice.logout();
  }
}
