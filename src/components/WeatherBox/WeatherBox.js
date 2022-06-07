import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = props => {
  
  const [currentWeatherData, setCurrentWeatherData] = useState('');
  const [pending, setPending] = useState(false);

  const handleCityChange = useCallback(CITY_VALUE => {
    setPending(true);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${CITY_VALUE}&appid=929757977b65f1e4d51dca184ecf5730&units=metric`)
   .then(res => res.json())
   .then(data => {
     
     const weatherData = {
       city: data.name,
       temp: Math.round(data.main.temp),
       icon: data.weather[0].icon,
       description: data.weather[0].main
      };
      setPending(false);
      setCurrentWeatherData(weatherData);
    });

  }, []);

  return (
    <section>
      <PickCity action={handleCityChange}/>
      {(currentWeatherData && pending===false) && <WeatherSummary {...currentWeatherData}/>}
      {pending===true && <Loader />}
    </section>
  )
};

export default WeatherBox;