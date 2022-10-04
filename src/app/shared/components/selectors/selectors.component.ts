import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NameValueI, SelectorOutputI } from '../../interfaces';
import { UtilsService } from '../../services';

@Component({
  selector: 'selectors',
  templateUrl: 'selectors.component.html',
})
export class SelectorsComponent {
  types: NameValueI[] = [];
  kms = [1, 5, 20, 50, 100, 1000];
  @Input() type!: 'cameras' | 'incidents' | 'radars';
  @Input() kmMax!: number;
  @Output() onChange: EventEmitter<SelectorOutputI> =
    new EventEmitter<SelectorOutputI>();

  constructor(private utilsService: UtilsService) {
    this.types = this.utilsService.types;
  }
}
