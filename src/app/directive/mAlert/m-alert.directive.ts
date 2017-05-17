import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appMAlert]'
})
export class MAlertDirective {
  // constructor(){}
  constructor(elem: ElementRef, renderer: Renderer) {
     renderer.setElementStyle(elem.nativeElement, 'position', 'fixed');
     renderer.setElementStyle(elem.nativeElement, 'z-index', '12');
     renderer.setElementStyle(elem.nativeElement, 'width', '100%');
     renderer.setElementStyle(elem.nativeElement, 'top', '0');
  }

}
