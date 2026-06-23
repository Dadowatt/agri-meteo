import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-carte-senegal',
  imports: [],
  templateUrl: './carte-senegal.html',
  styleUrl: './carte-senegal.css',
})
export class CarteSenegal {
  @Output() regionSelectionnee = new EventEmitter<string>();

  selectionnerRegion(region: string){
    this.regionSelectionnee.emit(region);

  }
}
