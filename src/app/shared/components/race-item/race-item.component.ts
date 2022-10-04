import { Component, Input } from '@angular/core';
import { RaceItemGeneric } from '../../interfaces/race.interface';

@Component({
  selector: 'race-item',
  templateUrl: 'race-item.component.html',
})
export class RaceItemComponent {
  @Input() cameras: RaceItemGeneric[] = [];
  @Input() incidents: RaceItemGeneric[] = [];
  @Input() type!: string;
}
