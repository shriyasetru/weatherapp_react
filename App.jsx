import  { useState } from 'react';
import './App.css'

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = "a209ddb914c84b01bb6125907241903";

  const getWeather = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city === "") {
      alert("Please enter a city name");
    } else {
      getWeather();
    }
  };

  return (
    <div className="container">
      <h1><img className="logo" src="src\assets\weather_icon.jpg" alt="Logo"/> Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input className='searchbar' type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter City Name" />
        <button className='searchbtn' type="submit">Search</button>
      </form>
      {weatherData && (
        <div className="weather-display">
          <div className="location">{weatherData.location.name}</div>
          <div className="icon"><img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text}/></div>
          <div className="temperature">{weatherData.current.temp_c}°C / {weatherData.current.temp_f}°F</div>
          <div className="description">{weatherData.current.condition.text}</div>
          <div className="humidity">Humidity: {weatherData.current.humidity}%</div>
          <div className="wind">Wind: {weatherData.current.wind_kph} km/h</div>
        </div>
      )}
    </div>
  );
};

export default App;
