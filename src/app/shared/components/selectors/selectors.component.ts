import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NameValueI } from '../../interfaces/generic.interface';

@Component({
  selector: 'selectors',
  templateUrl: 'selectors.component.html',
})
export class SelectorsComponent {
  @Input() types!: NameValueI[];
  @Input() kms!: number[];
  @Input() type!: string;
  @Input() kmMax!: number;
  @Output() onChange: EventEmitter<void> = new EventEmitter<void>()
}
