import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe-list/recipe-item/recipe.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  id: number;
  editMode: boolean =false;
  recipeFrom: FormGroup;
  errorMessageHandlingPut_Post: any = null ;


  private subErrorHandling:Subscription;
  private subsuccessHandling:Subscription;


  constructor(private activeRoute: ActivatedRoute,
              private recipeService:RecipeService,
              private router:Router) { }

  ngOnInit(): void {



    this.activeRoute.params.subscribe((params)=> {
      this.id = params["id"];
      this.editMode = params['id'] != null;
      this.initForm() ;

    });
  }

  OnSubmit(){
    const newRecipe = new Recipe(
      this.recipeFrom.value['name'],
      this.recipeFrom.value['description'],
      this.recipeFrom.value['imagePath'],
      this.recipeFrom.value['ingredients']


    );
    if (this.editMode){
      this.recipeService.updateRecipe(this.id,newRecipe);
    }else{
      this.recipeService.addRecipe(newRecipe)

    }
    //sub to the error message while posting or put data
    this.subErrorHandling = this.recipeService.errorPostHandling.subscribe(errorMessage=> {
      this.errorMessageHandlingPut_Post = errorMessage;
      if(this.errorMessageHandlingPut_Post.status !== 401){
        this.onCancel();
      }
    });

    this.subsuccessHandling = this.recipeService.sucessPostHandling.subscribe(()=> {
      this.errorMessageHandlingPut_Post = null;
      this.onCancel();
    });

  }

  private initForm(){
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';
    let recipeIngredient = new FormArray([]);

    if (this.editMode){
      const recipe= this.recipeService.getReciperByid(this.id)
      recipeName = recipe.name;
      recipeImagePath =recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredient']){
        recipe.ingredient.forEach(e=>{
          recipeIngredient.push(new FormGroup({
            'name': new FormControl(e.name,Validators.required),
            'amount': new FormControl(e.amount,
              [
              Validators.required,
              Validators.pattern(/^[1-9][0-9]*$/)
              ])
          }))
        });
      }
    }
    this.recipeFrom = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'imagePath': new FormControl(recipeImagePath,Validators.required),
      'ingredients': recipeIngredient

    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeFrom.get('ingredients' +
      '')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,
          [
          Validators.required,
          Validators.pattern(/^[1-9][0-9]*$/)
        ])
      })
    );
  }

  getContorls(){
    return (<FormArray>this.recipeFrom.get('ingredients')).controls;
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.activeRoute});
  }

  onDeleteIngrident(index: number) {
    (<FormArray>this.recipeFrom.get('ingredients')).removeAt(index);
  }

  ngOnDestroy(): void {
    if (this.subErrorHandling){
      this.subErrorHandling.unsubscribe();
    }
    if (this.subsuccessHandling){
      this.subsuccessHandling.unsubscribe();
    }
  }
}
