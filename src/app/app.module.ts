import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ServerComponent} from "./server/server.component";
import { ServersComponent } from './servers/servers.component';
import { Assign1Component } from './assign1/assign1.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './dropdown.directive';
import {ShoppingListService} from "./shopping-list/shoppingList.service";
import {AppRoutingModule} from "./app-routing.module";
import {RecipeService} from "./recipes/recipe.service";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthInterceptorService} from "./AuthInterceptor.service";
import { AuthComponent } from './auth/auth/auth.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import {LoggingInterceptorService} from "./loggingInterceptor.service";
import { AlertComponentComponent } from './alert-component/alert-component.component';
import { PlaceHolderErrorDirective } from './place-holder-error.directive';
import {RecipesModule} from "./recipes/recipes.module";
import {ShoppingListModule} from "./shopping-list/shoppingList-module";

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    Assign1Component,
    HeaderComponent,
    DropdownDirective,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponentComponent,
    PlaceHolderErrorDirective
  ],
    imports: [
        BrowserModule,//to be used only once use CommunModule in all other module to not get the ngForOf Err
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        RecipesModule,
        ShoppingListModule
    ],
  providers: [ShoppingListService,RecipeService,
    {
      provide : HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptorService
    },
    {
      provide : HTTP_INTERCEPTORS,
      multi: true,
      useClass: LoggingInterceptorService
    }
  ],
  bootstrap: [AppComponent]
  //no need for entryComponent for the dynamic component cuz of Ivy (9version angular or higuer)
})
export class AppModule { }
