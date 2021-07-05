import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeDetailsComponent} from "./recipes/recipe-details/recipe-details.component";
import {RecipeStartComponent} from "./recipes/recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
import {RecipeResolverService} from "./recipes/recipeResolver.service";
import {AuthComponent} from "./auth/auth/auth.component";


const appRoute: Routes=[
  {path:'', redirectTo:'/recipes', pathMatch: 'full'},
  {path:'recipes', component: RecipesComponent , children: [
      {path: '' , component: RecipeStartComponent},
      {path: 'new' , component: RecipeEditComponent},
      {path: ':id' , component: RecipeDetailsComponent , resolve : [RecipeResolverService]} ,
      {path: ':id/edit' , component: RecipeEditComponent , resolve : [RecipeResolverService]},

    ]},

  {path:'shopping-list', component: ShoppingListComponent},
  {path:'auth', component: AuthComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
