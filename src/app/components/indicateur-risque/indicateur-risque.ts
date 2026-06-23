import { Component, Input } from '@angular/core';
import { IndiceRisque } from '../../modeles/indice-risque.model';

@Component({
  selector: 'app-indicateur-risque',
  imports: [],
  templateUrl: './indicateur-risque.html',
  styleUrl: './indicateur-risque.css',
})
export class IndicateurRisque {
    @Input() risque!: IndiceRisque;
}
