export interface CoordonneesRegion {
  latitude: number;
  longitude: number;
}


export const REGIONS: {
  [key: string]: CoordonneesRegion
} = {

  Dakar: {
    latitude: 14.7167,
    longitude: -17.4677
  },

  Diourbel: {
    latitude: 14.655,
    longitude: -16.233
  },

  Fatick: {
    latitude: 14.339,
    longitude: -16.411
  },

  Kaffrine: {
    latitude: 14.105,
    longitude: -15.55
  },

  Kaolack: {
    latitude: 14.15,
    longitude: -16.075
  },

  Kedougou: {
    latitude: 12.56,
    longitude: -12.18
  },

  Kolda: {
    latitude: 12.89,
    longitude: -14.94
  },

  Louga: {
    latitude: 15.61,
    longitude: -16.22
  },

  Matam: {
    latitude: 15.65,
    longitude: -13.25
  },

  SaintLouis: {
    latitude: 16.03,
    longitude: -16.48
  },

  Sedhiou: {
    latitude: 12.71,
    longitude: -15.55
  },

  Tambacounda: {
    latitude: 13.77,
    longitude: -13.67
  },

  Thies: {
    latitude: 14.79,
    longitude: -16.93
  },

  Ziguinchor: {
    latitude: 12.58,
    longitude: -16.27
  }

};