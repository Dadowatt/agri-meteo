import { Service, inject } from '@angular/core';
import { Observable, from, map, catchError, of } from 'rxjs';
import { REGIONS } from '../constants/regions';

@Service()
export class Geolocalisation {
    getRegion(): Observable<string> {

        if (!navigator.geolocation) {
            return of('Dakar');
        }
        return from(
            new Promise<GeolocationPosition>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve,reject);
                }
            )).pipe(
                map((position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    return this.findRegion(latitude,longitude);
                }),
                catchError(() => {
                    return of('Dakar');
                })
            );
    }

private findRegion(latitude: number,longitude: number): string {

    for (const region in REGIONS) {
        const coordonnees = REGIONS[region];
        const distance = Math.sqrt(Math.pow(latitude - coordonnees.latitude,2) +
                Math.pow(longitude - coordonnees.longitude,2));
        if (distance < 1) {
            return region;
        }
    }
    return 'Dakar';

}

}
