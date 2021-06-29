import {Ingredient} from "../shared/ingredient.model";

export interface RecipePost{
  id?:string;
  name:string;
  description:string;
  imagePath:string;
  ingredient:Ingredient[];

}
