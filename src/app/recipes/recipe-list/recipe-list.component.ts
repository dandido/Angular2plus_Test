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
  isFetching: boolean =true;
  errorFetching: boolean =false;
  recipes: Recipe[] = [];
  recipSub: Subscription;
  filtredStatus: any ='';

  appStatus: Promise<string>= new Promise((resolve , reject) => {
    setTimeout(()=> {
      resolve('stable')
    },2000);
  });
  errorFetchingMessage: string = 'Cannot Fetch data';
  InfoFetchingMessage: string = 'Please wait while fetching data';

  constructor(private recipeService: RecipeService,
              private activateRoute: ActivatedRoute,
              private  router:Router) { }

  ngOnInit(): void {
    this.recipeService.getReciper().subscribe(responseData=> {
      console.log(responseData)
      this.recipes= responseData;
      this.isFetching = false;
      //return a copy => new Array
      this.recipes = this.recipes.slice();
    },(err)=> {
      this.isFetching = false;
      this.errorFetching = true;
    });
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
