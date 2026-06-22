import { DonneesMeteo } from "./donnees-meteo.model";

export interface EtatMeteo {
    loading: boolean;
    data?: DonneesMeteo;
    error?: string;
}
