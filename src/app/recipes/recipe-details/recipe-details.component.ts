import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe-list/recipe-item/recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  selectrecipedetails:Recipe;
  id: number;
  constructor(private recipeService: RecipeService,
              private activeRoute: ActivatedRoute,
              private router:Router
  ) { }

  ngOnInit(): void {

    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.id = +params["id"];
        this.selectrecipedetails = this.recipeService.getReciperByid(this.id);

      }
    )
  }

  OnAddToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.selectrecipedetails.ingredient.slice());//send a copy and note the real stuff #refrence
  }

  OnEditRecipe() {
    this.router.navigate(['../',this.id,'edit'] , {relativeTo:this.activeRoute});

  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
