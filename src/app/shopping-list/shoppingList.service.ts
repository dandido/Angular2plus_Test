import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService{

 ingredientChanged = new Subject<Ingredient[]>();

 ItemShoppingListEdit  = new Subject<number>();

  private ingredients:Ingredient[] = [
    new Ingredient("apple",5),
    new Ingredient("fuck",0),
    new Ingredient("tomato",15)
  ];

  getIngredient(){
  return this.ingredients.slice();
  }

  getIngredientById(index:number){
    return this.ingredients[index];
  }

  updateIngredient(index:number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){//we are receiving a ref from recipedetails
    this.ingredients.push(...ingredients);
    // @ts-ignore
    this.ingredients = this.ingredients.reduce((unique, item) => {
      // @ts-ignore
      return unique.some(e=> e.name === item.name) ?
        this.uniquefunction(unique,item,this.ingredients) : [...unique, item];
    }, []);

    this.ingredientChanged.next(this.ingredients.slice());

  }

  private uniquefunction(unique: any , item:Ingredient,ingredients: Ingredient[]) {
    const indexOfunique = unique.findIndex((e: { name: string; })=> e.name === item.name);
    unique[indexOfunique].amount = unique[indexOfunique].amount + item.amount;
    return unique;
  }
}

