import {Directive, HostBinding, HostListener, Input, OnInit} from '@angular/core';
import {EventListener} from '@angular/core/src/debug/debug_node';

@Directive({
  selector: '[appSelectedRecipe]'
})
export class SelectedRecipeDirective implements OnInit{

  @Input() defaultColor = 'grey';
  @Input() highLightColor = 'red';
  @HostBinding('style.color') color = this.defaultColor;

  @HostListener('mouseenter') onMouseEnter(evendData: Event) {
    this.color = this.highLightColor;

  }

  @HostListener('mouseleave') onMouseLeave(evendData: Event) {
    this.color = this.defaultColor;

  }

  ngOnInit(){
    this.color = this.defaultColor;
  }

  constructor() {}

}
