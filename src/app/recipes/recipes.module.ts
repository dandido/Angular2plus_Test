import {NgModule} from "@angular/core";
import {RecipesComponent} from "./recipes.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeDetailsComponent} from "./recipe-details/recipe-details.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {ShortenPipe} from "../shorten.pipe";
import {FilterbyPipe} from "../filterby.pipe";
import {RecipesRoutingModule} from "./recipes-routing.module";
import {SharedModule} from "../shared/Shared.Module";

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
  imports: [SharedModule,RecipesRoutingModule]
})
export class RecipesModule{


}
