import {NgModule} from "@angular/core";
import {RecipesComponent} from "./recipes.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeDetailsComponent} from "./recipe-details/recipe-details.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShortenPipe} from "../shorten.pipe";
import {FilterbyPipe} from "../filterby.pipe";
import {RecipesRoutingModule} from "./recipes-routing.module";
import {DropdownDirective} from "../dropdown.directive";

@NgModule({
  declarations:[
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    ShortenPipe,
    FilterbyPipe
  ],
  //RouterModule : get Rid of the routerOutlet erroor
  //make a seperate router Recipe and import it
  imports: [RouterModule,CommonModule,ReactiveFormsModule,FormsModule,RecipesRoutingModule],
})
export class RecipesModule{


}
