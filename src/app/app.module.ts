import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ServerComponent} from "./server/server.component";
import { ServersComponent } from './servers/servers.component';
import { Assign1Component } from './assign1/assign1.component';
import { HeaderComponent } from './header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { AuthComponent } from './auth/auth/auth.component';
import {RecipesModule} from "./recipes/recipes.module";
import {ShoppingListModule} from "./shopping-list/shoppingList-module";
import {SharedModule} from "./shared/Shared.Module";
import {CoreModule} from "./core.module";
import {AuthModule} from "./auth/auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    Assign1Component,
    HeaderComponent,
  ],
    imports: [
        BrowserModule,//to be used only once use CommunModule in all other module to not get the ngForOf Err
        HttpClientModule,
        AppRoutingModule,
        RecipesModule,
        ShoppingListModule,
      SharedModule,
      CoreModule,
      AuthModule
    ],
  bootstrap: [AppComponent]
  //no need for entryComponent for the dynamic component cuz of Ivy (9version angular or higuer)
})
export class AppModule { }
