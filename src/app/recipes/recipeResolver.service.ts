import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe-list/recipe-item/recipe.model";
import {Observable} from "rxjs";
import {RecipeService} from "./recipe.service";

@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{

  constructor(private recipeService : RecipeService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (this.recipeService.recipes){
      return this.recipeService.recipes
    }
    return this.recipeService.getReciper();
  }

}
