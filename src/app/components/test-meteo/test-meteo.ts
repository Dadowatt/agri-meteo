import { Component, inject } from '@angular/core';
import { Meteo } from '../../services/meteo';

@Component({
  selector: 'app-test-meteo',
  imports: [],
  templateUrl: './test-meteo.html',
  styleUrl: './test-meteo.css',
})
export class TestMeteo {
    private meteo = inject(Meteo);


  ngOnInit(){

    this.meteo.getWeatherByRegion('Dakar')
      .subscribe({

        next: (data) => {

          console.log(
            "Données météo reçues :",
            data
          );

        },


        error: (err) => {

          console.error(
            "Erreur météo :",
            err
          );

        }

      });

  }
}
