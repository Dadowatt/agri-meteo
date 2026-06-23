import { Component, inject, OnInit, signal } from '@angular/core';
import { Meteo } from '../../services/meteo';
import { Geolocalisation } from '../../services/geolocalisation';
import { EtatMeteo } from '../../modeles/etat-meteo.model';
import { GraphiqueMeteo } from '../graphique-meteo/graphique-meteo';

@Component({
  selector: 'app-tableau-bord',
  imports: [GraphiqueMeteo],
  templateUrl: './tableau-bord.html',
  styleUrl: './tableau-bord.css',
})
export class TableauBord implements OnInit {

  // Services injectés
  private meteo = inject(Meteo);
  private geo = inject(Geolocalisation);

  // État global de la météo (loading, data, error)
  etatMeteo = signal<EtatMeteo>({
    loading: true
  });

  // Région actuellement sélectionnée (utile pour la carte plus tard)
  regionActuelle = signal<string>('');

  ngOnInit(): void {

    // Au démarrage : on utilise la géolocalisation
    // (fallback automatique si l'utilisateur n'a pas encore cliqué sur la carte)

    this.geo.getRegion().subscribe({

      next: (region) => {

        // on charge la météo de la région détectée
        this.chargerRegion(region);

      },

      error: (err) => {
        console.error('Erreur géolocalisation :', err);
      }

    });

  }

  /**
   * Fonction principale du dashboard
   * Elle sera aussi utilisée par la carte SVG plus tard
   *
   * Exemple futur côté carte :
   * this.chargerRegion('dakar')
   */
  chargerRegion(region: string): void {

    // On mémorise la région sélectionnée
    this.regionActuelle.set(region);

    // Appel du service météo
    this.meteo.getWeatherState(region).subscribe({

      next: (etat) => {

        // On met à jour l’état global du dashboard
        this.etatMeteo.set(etat);

      },

      error: (err) => {

        console.error('Erreur météo :', err);

        // Optionnel : on pourrait gérer un état erreur ici
      }

    });

  }

}