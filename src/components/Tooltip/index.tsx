import React, { useEffect, useState } from 'react';
import format from 'date-fns/format';
import enUS from 'date-fns/locale/en-US';
import { getLocationWeather } from '../../services/weather';
import * as S from './styles';

type ReminderProps = {
  title: string;
  datetime: Date;
  city: string;
  formattedDate?: string;
};

interface TooltipProps {
  handleUpdateReminder(): void;
  isOpen: boolean;
  color: string;
  reminder: ReminderProps;
}

const Tooltip: React.FC<TooltipProps> = ({
  reminder,
  handleUpdateReminder,
  isOpen,
  color,
}) => {
  const [formattedDate, setFormattedDate] = useState('');
  const [weatherForecast, setWeatherForecast] = useState('');
  const [weatherForecastImage, setWeatherForecastImage] = useState('');
  const [weatherTemp, setWeatherTemp] = useState('');
  useEffect(() => {
    if (reminder.datetime) {
      setFormattedDate(
        format(reminder.datetime, "EEEE',' MMMM', 'dd', ' yyyy 'at' HH:mm'h'", {
          locale: enUS,
        })
      );
    }

    if (reminder.city) {
      getLocationWeather(reminder.city).then(({ data }) => {
        const [forecast] = data.weather;
        const { temp } = data.main;
        setWeatherForecast(forecast.main);
        setWeatherForecastImage(forecast.icon);
        setWeatherTemp(`${temp.toString().substring(0, 2)} °C`);
      });
    }
  }, [reminder]);

  return (
    <S.Container isOpen={isOpen}>
      <S.Content color={color}>
        <h3>{reminder.title}</h3>
        <h4>{formattedDate}</h4>
        <p>{reminder.city}</p>
        <img
          src={`https://openweathermap.org/img/wn/${weatherForecastImage}@2x.png`}
          alt={weatherForecast}
        />
        <h4>{weatherTemp}</h4>

        <p>{weatherForecast}</p>

        <button type="button" onClick={handleUpdateReminder}>
          Edit
        </button>
      </S.Content>
    </S.Container>
  );
};

export default Tooltip;
