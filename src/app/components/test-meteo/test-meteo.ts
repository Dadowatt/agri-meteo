import { Component, inject } from '@angular/core';
import { Meteo } from '../../services/meteo';
import { Geolocalisation } from '../../services/geolocalisation';

@Component({
  selector: 'app-test-meteo',
  imports: [],
  templateUrl: './test-meteo.html',
  styleUrl: './test-meteo.css',
})
export class TestMeteo {

  private meteo = inject(Meteo);

  private geo = inject(Geolocalisation);
  ngOnInit(){
    this.geo
      .getRegion()
      .subscribe({

        next: (region) => {
          console.log("Région détectée :", region);
          this.meteo
            .getWeatherByRegion(region)
            .subscribe({
              next: (data) => {
                console.log(
                  "Données météo reçues :",
                  data
                );
              },
              error: (err) => {
                console.error("Erreur météo :", err);
              }
            });
        },
        error: (err) => {
          console.error("Erreur localisation :",err);
        }
      });
  }

}