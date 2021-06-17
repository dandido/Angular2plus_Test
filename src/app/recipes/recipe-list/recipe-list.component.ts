import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "./recipe-item/recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipSub: Subscription;
  filtredStatus: any ='';

  appStatus: Promise<string>= new Promise((resolve , reject) => {
    setTimeout(()=> {
      resolve('stable')
    },2000);
  });

  constructor(private recipeService: RecipeService,
              private activateRoute: ActivatedRoute,
              private  router:Router) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getReciper();

    this.recipSub = this.recipeService.recipeChanged.subscribe(  (recipes: Recipe[])=> {
      this.recipes = recipes;
    })
  }

  OnNewRecipe() {
    this.router.navigate(['new'] , {relativeTo:this.activateRoute});
  }

  ngOnDestroy(): void {
    this.recipSub.unsubscribe();
  }
}
