import { Component, inject, OnInit, signal } from '@angular/core';
import { Meteo } from '../../services/meteo';
import { Geolocalisation } from '../../services/geolocalisation';
import { JsonPipe } from '@angular/common';
import { EtatMeteo } from '../../modeles/etat-meteo.model';
import { GraphiqueMeteo } from "../graphique-meteo/graphique-meteo";

@Component({
  selector: 'app-test-meteo',
  imports: [JsonPipe, GraphiqueMeteo],
  templateUrl: './test-meteo.html',
  styleUrl: './test-meteo.css',
})
export class TestMeteo implements OnInit {

  private meteo = inject(Meteo);
  private geo = inject(Geolocalisation);

  // ✅ SIGNAL au lieu de variable classique
  etatMeteo = signal<EtatMeteo>({
    loading: true
  });

  ngOnInit(): void {

    this.geo.getRegion().subscribe({

      next: (region) => {

        console.log("Région détectée :", region);

        this.meteo.getWeatherState(region).subscribe({

          next: (etat) => {

            console.log("NOUVEL ETAT :", etat);

            // ✅ mise à jour du signal
            this.etatMeteo.set(etat);

            console.log("VALEUR DANS LE SIGNAL :", this.etatMeteo());

          },

          error: (err) => {

            console.error("Erreur météo :", err);

          }

        });

      },

      error: (err) => {

        console.error("Erreur localisation :", err);

      }

    });

  }

}