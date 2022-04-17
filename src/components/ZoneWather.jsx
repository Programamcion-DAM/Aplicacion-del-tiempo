import React, { useEffect, useState } from 'react'
import './ZoneWeather.css';
import { helpHttp } from '../helpers/helpHttp'

const api = helpHttp();

const ZoneWather = ({idProvince,idTown,deleteCity}) => {
    const [data, setData] = useState([])
    
    useEffect(() => {
        if(!idTown)return;
        let url = `https://www.el-tiempo.net/api/json/v2/provincias/${idProvince}/municipios/${idTown}`
        api.get(url).then(res=>{
            if(!res.err)setData(res);
        });
    }, [idTown])

    const {temperatura_actual,municipio,stateSky,pronostico,viento} = data;
    
    let temp = temperatura_actual;
    let cityName = municipio && municipio.NOMBRE;
    let sunrise = pronostico && pronostico.hoy["@attributes"].orto;
    let sunset = pronostico && pronostico.hoy["@attributes"].ocaso;
    let windVelocity = viento && viento;

    const getUrlImage = ()=>{
        if (!stateSky) return;
        switch(stateSky.description){
            case "Despejado": return "http://localhost:3000/images/sunny.png";
            case "Nuboso": return "http://localhost:3000/images/cloud.png";
            case "Nubes altas": return "http://localhost:3000/images/cloud.png";
            case "Poco nuboso": return "http://localhost:3000/images/cloud.png";
            case "Cubierto": return "http://localhost:3000/images/cloud.png";
            case "LLuvia": return "http://localhost:3000/images/rain.png"
            default: return "#";
        }
    }

    return (
        <div className='weatherTarget'>
            <div className='titleHeart'>
                <h2 id="cityName">{cityName && cityName}</h2>
                { idTown && <img onClick={()=>deleteCity(idTown)}id="heart" src="http://localhost:3000/images/heartRed.png" alt="Guardar en favoritos" />}
            </div>  
            {stateSky && <img src={getUrlImage()} alt={stateSky.description} id="weatherIcon"></img>}
            <h2 id="tempeture">{temp && temp+"ºC"}</h2>
            <div className='sunTime'>
                <h2 className='sunriseSunset'>{sunrise && sunrise}</h2>
                {sunrise && <img className= "sunriseSunsetImage"src="http://localhost:3000/images/sunrise.png" alt="Hora de amanecez"></img>}
            </div>
            <div className='sunTime'>
                <h2 className='sunriseSunset'>{sunset && sunset}</h2>
                {sunset && <img src='http://localhost:3000/images/sunset.png'className='sunriseSunsetImage'alt="Hora de atardecer"></img>}
            </div>
            <h2 id="windVelocity">{windVelocity && windVelocity}</h2>
            {windVelocity && <img id = "windImage" src="http://localhost:3000/images/wind.png" alt = "Velocidad del viento"></img>}
        </div>
    )
}

export default ZoneWather