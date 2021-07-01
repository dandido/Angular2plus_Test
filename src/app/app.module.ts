import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ServerComponent} from "./server/server.component";
import { ServersComponent } from './servers/servers.component';
import { Assign1Component } from './assign1/assign1.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './dropdown.directive';
import {ShoppingListService} from "./shopping-list/shoppingList.service";
import {AppRoutingModule} from "./app-routing.module";
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import {RecipeService} from "./recipes/recipe.service";
import {ShortenPipe} from "./shorten.pipe";
import { FilterbyPipe } from './filterby.pipe';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthInterceptorService} from "./AuthInterceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    Assign1Component,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    ShortenPipe,
    FilterbyPipe
  ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
    ],
  providers: [ShoppingListService,RecipeService
  ,   {
      provide : HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptorService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
