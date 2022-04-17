import React from 'react'
import './CityWeather.css'

const CityWeatherForecast = ({forecast}) => {
    let initialHour = 24-forecast.temperatura.length;
    let data = forecast.temperatura.map((el,i) => ({
        temp:forecast.temperatura[i],
        rain: forecast.precipitacion[i],
        wind: forecast.viento[i],
        hour: initialHour+i,
    }))
    return (
    <div>
        {data.map((hour,i) => <Forecast 
                                key = {i} 
                                hour = {hour.hour}
                                temp={hour.temp} 
                                rain={hour.rain} 
                                windDirection={hour.wind.direccion} 
                                windVelocity={hour.wind.velocidad}/>
                                )}
    </div>
  )
}

const Forecast = ({hour,temp,rain,windDirection,windVelocity}) => {
    return (
        <div className= "forecast">
            <h4 className='forecastTemp'>{temp}º</h4>
            <h4 className='forecastRain'>{rain}%</h4>
            <h4 className='forecastVelocity'>{windVelocity}<span>km/h</span></h4>
            <h4 className='forecastHour'>{hour>9? hour:"0"+hour}:00</h4>
        </div>
    )
}

export default CityWeatherForecast

