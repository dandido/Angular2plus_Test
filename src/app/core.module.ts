import {NgModule} from "@angular/core";
import {ShoppingListService} from "./shopping-list/shoppingList.service";
import {RecipeService} from "./recipes/recipe.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "./AuthInterceptor.service";
import {LoggingInterceptorService} from "./loggingInterceptor.service";

@NgModule({
  providers:[
    ShoppingListService,
    RecipeService,
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
  ]
})
export class CoreModule{

}
