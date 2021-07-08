import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {ShoppingListRoutingModule} from "./shoppingList-routing.module";
import {SharedModule} from "../shared/Shared.Module";


@NgModule({
  declarations:[
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  //RouterModule : get Rid of the routerOutlet erroor
  //make a seperate router Recipe and import it
  imports: [SharedModule,ShoppingListRoutingModule]
})
export class ShoppingListModule{

}
