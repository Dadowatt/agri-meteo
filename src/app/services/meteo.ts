import { inject, Injectable} from '@angular/core';
import { IndiceRisque } from '../modeles/indice-risque.model';
import { DonneeGraphique } from '../modeles/donnee-graphique.model';
import { HttpClient } from '@angular/common/http';
import { REGIONS } from '../constants/regions';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { environment } from '../../environments/environment';
import { WeatherApiResponse } from '../modeles/weather-api-response.model';
import { DonneesMeteo } from '../modeles/donnees-meteo.model';
import { EtatMeteo } from '../modeles/etat-meteo.model';


@Injectable({
  providedIn: 'root'
})
export class Meteo {
    private http = inject(HttpClient);

    getWeatherByRegion(region: string): Observable<DonneesMeteo> {

        const coordonnees = REGIONS[region];

        const url = `${environment.apiUrl}?lat=${coordonnees.latitude}&lon=${coordonnees.longitude}&units=metric&lang=fr&appid=${environment.apiKey}`;

        return this.http.get<WeatherApiResponse>(url).pipe(map((data) => 
            this.transformWeatherData(data, region)));
    }
    calculateRisk(temperature: number, humidite: number):IndiceRisque {
        if (temperature > 38 && humidite > 60) {
            return {
                score: 85,
                libelle: 'Risque canicule élevé',
                couleur: '#FF4500'
            };
        }
        if (temperature > 30 || humidite > 70) {
            return {
                score: 40,
                libelle: 'Risque Modéré',
                couleur: '#FFD700'
            };
        }

        return {
            score: 15,
            libelle: 'Risque Faible',
            couleur: '#28A745'
        };
    }

    generateHistory(temperatureActuelle: number): DonneeGraphique[] {

        const historique: DonneeGraphique[] = [];

        const jours = [
            'Lun',
            'Mar',
            'Mer',
            'Jeu',
            'Ven',
            'Sam',
            'Dim'
        ];

    jours.forEach(jour => {

        const variation = Math.random() * 6 - 3;

        const temperature = Number((temperatureActuelle + variation).toFixed(2));

        historique.push({
            jour: jour,
            temperature: temperature
        });
    });

    return historique;
    }
    
    transformWeatherData(data: WeatherApiResponse, region: string): DonneesMeteo {

    const temperature = Number(data.main.temp.toFixed(2));

    const humidite = data.main.humidity;

    const condition = data.weather[0].description;

    const icone = data.weather[0].icon;

    const risque = this.calculateRisk(temperature, humidite);

    const historique = this.generateHistory(temperature);

    return {

        region: region,

        temperature: temperature,

        humidite: humidite,

        condition: condition,

        icone: icone,

        historique: historique,

        risque: risque

    };
}

getWeatherState(region: string): Observable<EtatMeteo> {

  return this.getWeatherByRegion(region).pipe(

    map((data) => {

      return {
        loading: false,
        data: data
      } as EtatMeteo;

    }),

    startWith({
      loading: true
    } as EtatMeteo),

    catchError(() => {

      return of({
        loading: false,
        error: "Impossible de récupérer les données météo"
      } as EtatMeteo);

    })

  );

}
}
