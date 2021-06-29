import {Recipe} from "./recipe-list/recipe-item/recipe.model";
import {Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shoppingList.service";
import {Subject, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";

@Injectable()
export class RecipeService{
  recipeChanged = new Subject<Recipe[]>();
  constructor(private shoppingListService:ShoppingListService,
              private httpclient:HttpClient) {
  }
 // private recipes:Recipe[];
  url:string = 'https://ng-complete-guide-938cf-default-rtdb.europe-west1.firebasedatabase.app/';
  recipespath:string = 'recipes.json'
  private recipes: Recipe[];

  //let's say that post and/or put are used in different components
  //use a subject
  errorPostHandling = new Subject<string>();
  sucessPostHandling = new Subject<any>();

  getReciper(){
    return this.httpclient.get<Recipe[]>(this.url+this.recipespath)
      .pipe(map(responseData => {
        const ingArray:Recipe[] =[];
        for (const key in responseData){
          if (responseData.hasOwnProperty(key))
          { // @ts-ignore
            ingArray.push({ ...responseData[key] , id:key})
          }
        }
        this.recipes = ingArray.slice();
        return ingArray;
      }),
        catchError(errorRes => {
          //send to analytc or to a subject.next ....
          return throwError(errorRes);
        })
      );

  }

  addIngredientToShoppingList(ingredients:Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getReciperByid(id: number) {
    return this.recipes[id];

  }


  addRecipe(recipe: Recipe){
    this.httpclient.post<{name: string}>(this.url+this.recipespath,recipe)
      .subscribe(responseData=> {
      console.log(responseData);
        recipe.id = responseData.name;
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
        this.sucessPostHandling.next(responseData);
    }, error=> {
        this.errorPostHandling.next(error);
      });

  }

  updateRecipe(index: number, newRecipe: Recipe){
   const test = {
      [this.recipes[index].id] : newRecipe
    }
    //newRecipe.id = this.recipes[index].id;
    this.httpclient.put(this.url+this.recipespath,test).subscribe(responseData=> {
      this.recipes[index] = newRecipe;
      this.recipeChanged.next(this.recipes.slice());
      this.sucessPostHandling.next(responseData);
    }, error=> {
      this.errorPostHandling.next(error);
    });

  }


  deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
