import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {AuthComponent} from "./auth/auth/auth.component";


const appRoute: Routes=[
  {path:'', redirectTo:'/recipes', pathMatch: 'full'},
 // {path:'recipes',loadChildren: './recipes/recipes.module#RecipesModule' } // lazy loading old project angular a9al mel 8
  {path:'recipes',
    loadChildren: ()=> import('./recipes/recipes.module')
      .then(m=> m.RecipesModule) } // lazy loading

];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
