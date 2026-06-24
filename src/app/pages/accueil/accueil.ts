import { Component } from '@angular/core';
import { CarteSenegal } from "../../components/carte-senegal/carte-senegal";
import { TableauBord } from "../../components/tableau-bord/tableau-bord";

@Component({
  selector: 'app-accueil',
  imports: [CarteSenegal, TableauBord],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil {}
