import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {ShoppingListRoutingModule} from "./shoppingList-routing.module";


@NgModule({
  declarations:[
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  //RouterModule : get Rid of the routerOutlet erroor
  //make a seperate router Recipe and import it
  imports: [RouterModule,CommonModule,ReactiveFormsModule,FormsModule,ShoppingListRoutingModule],
})
export class ShoppingListModule{

}
