import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";


const appRoute: Routes=[
  {path:'', redirectTo:'/recipes', pathMatch: 'full'},
 // {path:'recipes',loadChildren: './recipes/recipes.module#RecipesModule' } // lazy loading old project angular a9al mel 8
  {path:'recipes',
    loadChildren: ()=> import('./recipes/recipes.module')
      .then(m=> m.RecipesModule) } // lazy loading
  ,{path:'auth',
    loadChildren: ()=> import('./auth/auth/auth.module').then(m=> m.AuthModule) } // lazy loading
  ,{path:'shopping-list',
    loadChildren: ()=> import('./shopping-list/shoppingList-module').then(m=> m.ShoppingListModule) } // lazy loading
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
