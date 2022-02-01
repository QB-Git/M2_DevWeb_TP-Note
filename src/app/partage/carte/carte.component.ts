import { Music } from './../service/list-personnel.service';
import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent {

  @Input() music: Music;

  @Output('musicDelete') delete$: EventEmitter<any> = new EventEmitter();

  @Output('musicUpdate') update$: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.music = {};
  }

  delete() {
    this.delete$.emit(this.music);
  }

  update() {
    this.update$.emit(this.music);
  }

}
