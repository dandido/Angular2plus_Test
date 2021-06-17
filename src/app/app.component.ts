import { Component } from '@angular/core';

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
export class AppComponent {
  name = 'chedlty';

}
