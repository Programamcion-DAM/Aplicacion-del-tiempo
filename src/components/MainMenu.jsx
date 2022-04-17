import React, { useState,useEffect } from 'react';
import { helpHttp } from '../helpers/helpHttp';
import Browser from './Browser';
import CityWeather from './CityWeather';

const api = helpHttp();

const MainMenu = ({handleFavoritesCities,deleteCity}) => {
    const [town, setTown] = useState(null);
    const [data, setData] = useState(null);
    
    useEffect(() => {
        if(!town)return;
        let url = `https://www.el-tiempo.net/api/json/v2/provincias/${town.IdProvince}/municipios/${town.IdTown}`;
        api.get(url).then(res=>{
            if(!res.err)setData(res);
        });
    }, [town])
    
    const handleTown = (t)=>{
        setTown(t);
    }
    
    return (
        <div className='mainMenu'>
            <Browser handleTown={handleTown}/>
            {data && <CityWeather 
                    data = {data} 
                    cityName={town.name} 
                    handleFavoritesCities ={handleFavoritesCities}
                    deleteCity={deleteCity}
                    idProvince = {town.IdProvince}
                    idTown = {town.IdTown}
                    />
            }
        </div>
    )
}

export default MainMenu
