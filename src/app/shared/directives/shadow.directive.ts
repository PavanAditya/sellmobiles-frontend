import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  OnInit,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appShadow]'
})
export class ShadowDirective implements OnInit {
  @Input() appShadow: string;
  @Input() appShadowX: string;
  defaultcolor = 'white';

  constructor(private elem: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') mouseover(event: Event) {
    const shadowStyle = `${this.appShadowX} ${this.appShadowX} ${this.appShadowX} ${this.appShadowX} ${this.appShadow}`;
    this.renderer.setStyle(this.elem.nativeElement, 'box-shadow', shadowStyle);
  }
  @HostListener('mouseleave') mouseleave(event: Event) {
    const shadowStyle = `${this.appShadowX} ${this.appShadowX} ${this.appShadowX} ${this.appShadowX} ${this.defaultcolor}`;
    this.renderer.setStyle(this.elem.nativeElement, 'box-shadow', shadowStyle);
  }

  ngOnInit() {
  }
}
