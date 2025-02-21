import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [forecasts, setForecasts] = useState();

  useEffect(() => {
    populateWeatherData();
  }, []);

  const contents = forecasts === undefined
  ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;
  return (
    <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
  );

  async function populateWeatherData() {
            try {
                const response = await fetch('WeatherForecast');
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const contentType = response.headers.get("content-type");
    
                if (!contentType || !contentType.includes("application/json")) {
                    throw new TypeError("Oops, we haven't got JSON!");
                }
    
                const data = await response.json();
                setForecasts(data);
    
            } catch (error) {
                console.error('There was an error!', error);
            }
        }
}

export default App;
