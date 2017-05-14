import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appMAlert]'
})
export class MAlertDirective {
  constructor(){}
  // constructor(elem: ElementRef, renderer: Renderer) {
  //     renderer.setElementStyle(elem.nativeElement, 'backgroundColor', 'red');
  // }

}
