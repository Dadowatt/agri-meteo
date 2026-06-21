export interface WeatherApiResponse {

    main: {
        temp: number;
        humidity: number;
    };

    weather: {
        description: string;
        icon: string;
    }[];

    name: string;
}