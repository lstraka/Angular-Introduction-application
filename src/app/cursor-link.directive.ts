import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCursorLink]'
})
export class CursorLinkDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter')onMouseEnter() {
  console.log('in', this.el);
  this.changeCursor()
}

changeCursor(){
  this.el.nativeElement.style.cursor='pointer';
}
}
