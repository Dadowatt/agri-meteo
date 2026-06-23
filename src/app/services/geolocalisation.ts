
import { Injectable } from '@angular/core';
import { Observable, from, map, catchError, of } from 'rxjs';
import { REGIONS } from '../constants/regions';

@Injectable({
  providedIn: 'root'
})

export class Geolocalisation {
    getRegion(): Observable<string> {

        if (!navigator.geolocation) {
            return of('dakar');
        }
        return from(new Promise<GeolocationPosition>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve,reject); // API native du navigateur
                }
            )).pipe(
                map((position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    return this.findRegion(latitude,longitude);
                }),
                catchError(() => {
                    return of('dakar');
                })
            );
    }

    private findRegion(latitude: number,longitude: number): string {

    let regionLaPlusProche = 'dakar';
    let distanceMin = Infinity;

    for (const region in REGIONS) {
        const coordonnees = REGIONS[region];
        const distance = Math.sqrt(
            Math.pow(latitude - coordonnees.latitude, 2) + Math.pow(longitude - coordonnees.longitude, 2)
        );

        if (distance < distanceMin) {
            distanceMin = distance;
            regionLaPlusProche = region;
        }
    }
      // Si la position est très éloignée du Sénégal
        if (distanceMin > 5) {
            return 'dakar';
        }
    return regionLaPlusProche;

    }

}
