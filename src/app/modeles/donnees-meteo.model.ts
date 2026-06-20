import { DonneeGraphique } from "./donnee-graphique.model";
import { IndiceRisque } from "./indice-risque.model";

export interface DonneesMeteo {
    region: string;
    temperature: number;
    humidite: number;
    condition: string;
    icone: string;
    historique: DonneeGraphique[];
    risque: IndiceRisque;
}
