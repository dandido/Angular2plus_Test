import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShoppingListService} from "../shoppingList.service";
import {Ingredient} from "../../shared/ingredient.model";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
 // @ViewChild('nameInput') nameInputRef: ElementRef;
 // @ViewChild('amountInput') amountInputRef: ElementRef;

  @ViewChild('f', {static: false}) slForm:NgForm;
  ItemShoppingListEditSub: Subscription;
  editionMode = false;
  editNumberIndex:number;
  editCurrentItem:Ingredient;
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ItemShoppingListEditSub = this.slService.ItemShoppingListEdit.subscribe(
      (index:number) => {
        this.editionMode = true;
        this.editNumberIndex = index;
        this.editCurrentItem = this.slService.getIngredientById(index);
        this.slForm.setValue({
          name: this.editCurrentItem.name,
          amount: this.editCurrentItem.amount
        })
      }
    )
  }


  onAdd(form: NgForm) {
 //   const ingName = this.nameInputRef.nativeElement.value;
  //  const ingAmount =this.amountInputRef.nativeElement.value;
    const value = form.value;
    const newIngredient= new Ingredient(value.name,value.amount);
    if(this.editionMode){
      this.slService.updateIngredient(this.editNumberIndex,newIngredient);
    }else{
      this.slService.addIngredient(newIngredient);
    }
    this.editionMode =false;
    form.reset();
  }

  onClear() {
    this.editionMode =false;
    this.slForm.reset()
  }


  onDelete() {
    this.slService.deleteIngredient(this.editNumberIndex);
    this.onClear();
  }


  ngOnDestroy(): void {
    this.ItemShoppingListEditSub.unsubscribe();
  }
}
