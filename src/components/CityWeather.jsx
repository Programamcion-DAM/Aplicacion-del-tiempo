import React from 'react'
import "./CityWeather.css";
import CityWeatherForecast from './CityWeatherForecast';

const CityWeather = ({data,cityName,handleFavoritesCities,deleteCity,idProvince,idTown}) => {
    const {lluvia,pronostico,stateSky,temperatura_actual,temperaturas,viento} = data;
    
    const isTheCityOnFavorites = ()=>{
        let list = JSON.parse(localStorage.getItem("favoritesCities")).map(
            (city)=> city.idTown === idTown? true:false);
        return list.includes(true);
    }
    
    return (
        <div className='cityWeather'>
            {isTheCityOnFavorites()? 
            <img 
            onClick={()=>deleteCity(idTown)}    
            id = "addToFavoritesBtn"
                src="http://localhost:3000/images/heartRed.png" 
                alt="Agregar a favoritos"
            />
            :
            <img 
                onClick={()=>handleFavoritesCities(idProvince,idTown)}
                id = "addToFavoritesBtn"
                src="http://localhost:3000/images/heartBlack.png" 
                alt="Agregar a favoritos"
            />
            }
            <div id='cityWeatherPrincipalData'>
                <h2 id ="cityWeatherName">{cityName}</h2>
                <h4 id="cityWeatherTemperatureNow">{temperatura_actual} ºC</h4>
                <div id = "cityWeatherTemperatureMaxMin">
                    <h4 id='cityWeatherTemperatureMax'>{temperaturas.max}º</h4>
                    <h4 id='cityWeatherTemperatureMin'>{temperaturas.min}º</h4>
                </div>
                <div id='cityWeatherWindRain'>
                    <h4 id='cityWeatherWind'>{viento} <img src='http://localhost:3000/images/wind.png' alt='Velocidad del viento'></img></h4>
                    <h2 id='cityWeatherRain'>{lluvia}% <img src="http://localhost:3000/images/gota.png" alt="Probabilidad de lluvia" /></h2>
                </div>
                <h2 id='cityWeatherStateSky'>{stateSky.description}</h2>
            </div>
            <h2 className='forecastTitle'>Pronóstico hoy:</h2>
            <CityWeatherForecast forecast={pronostico.hoy}/>
            <h2 className='forecastTitle'>Pronóstico mañana:</h2>
            <CityWeatherForecast forecast={pronostico.manana}/>
        </div>
    )
}

export default CityWeather