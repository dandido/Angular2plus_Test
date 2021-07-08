import {NgModule} from "@angular/core";
import {AlertComponentComponent} from "../alert-component/alert-component.component";
import {LoadingSpinnerComponent} from "../loading-spinner/loading-spinner.component";
import {PlaceHolderErrorDirective} from "../place-holder-error.directive";
import {DropdownDirective} from "../dropdown.directive";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations:[
    AlertComponentComponent,
    LoadingSpinnerComponent,
    PlaceHolderErrorDirective,
    DropdownDirective
  ],
  imports:[CommonModule,RouterModule,ReactiveFormsModule,FormsModule],
  exports:[
    AlertComponentComponent,
    LoadingSpinnerComponent,
    PlaceHolderErrorDirective,
    DropdownDirective,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule{

}
