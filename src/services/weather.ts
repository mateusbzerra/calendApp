import axios, { AxiosResponse } from 'axios';

type WeatherProps = {
  main: string;
  icon: string;
};

type TempProps = {
  temp: string;
};

interface WeatherResponseProps {
  weather: WeatherProps[];
  main: TempProps;
}

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

const API_KEY = '7fd95506b0204a8f413f95ad8e6a9d17';

const getLocationWeather = (
  location: string
): Promise<AxiosResponse<WeatherResponseProps>> =>
  api.get<WeatherResponseProps>('weather', {
    params: {
      q: location,
      appid: API_KEY,
      units: 'metric',
    },
  });

export { getLocationWeather };
