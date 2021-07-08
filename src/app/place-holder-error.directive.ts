import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appPlaceHolderError]'
})
export class PlaceHolderErrorDirective {

  constructor(public viewContainerRef:ViewContainerRef) { }

}
