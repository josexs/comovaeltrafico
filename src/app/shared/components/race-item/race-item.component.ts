import { Component, Input } from '@angular/core';
import { ItemGenericI } from '../../interfaces';

@Component({
  selector: 'race-item',
  templateUrl: 'race-item.component.html',
})
export class RaceItemComponent {
  @Input() items: ItemGenericI[] = [];
  @Input() type!: 'cameras' | 'incidents' | 'radars';
}
