import {HostBinding, Component, ElementRef, Input, OnChanges} from '@angular/core';

import {
  animate, style, transition, trigger
} from "@angular/animations";

@Component({
  selector: 'app-smooth-width',
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      display: block;
      overflow: hidden;
    }
  `],
  animations: [
    trigger('grow', [
      transition('void <=> *', []),
      transition('* <=> *', [
        style({width: '{{startWidth}}px', opacity: 0}),
        animate('.5s ease'),
      ], {params: {startWidth: 0}})
    ])
  ]
})
export class SmoothWidthComponent implements OnChanges {
  @Input()
  trigger: string;

  startWidth: number;

  constructor(private element: ElementRef) {}

  @HostBinding('@grow') get grow() {
    return {value: this.trigger, params: {startWidth: this.startWidth}};
  }

  setStartWidth(){
    this.startWidth = this.element.nativeElement.clientWidth;
  }

  ngOnChanges(){
    this.setStartWidth();
  }
}
