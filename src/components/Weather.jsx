import React, { useState } from 'react'
import Favorites from './Favorites';
import MainMenu from './MainMenu';

const Weather = () => {
  const [favoritesCities, setFavoritesCities] = useState(JSON.parse(localStorage.getItem("favoritesCities")));
  //Añade una nueva ciudad a favoritos
  const handleFavoritesCities = (idProvince,idTown) =>{
    let newCities = [...favoritesCities,{idProvince,idTown}];
    setFavoritesCities(newCities);
    localStorage.setItem("favoritesCities",JSON.stringify(newCities));
  }
  //Elimina una ciudad de favoritos
  const deleteCity = (idTown)=>{
    let newCities = favoritesCities.filter((city) => city.idTown !== idTown);
    setFavoritesCities(newCities);
    localStorage.setItem("favoritesCities",JSON.stringify(newCities));
}

  return (
    <div>  
        <MainMenu handleFavoritesCities={handleFavoritesCities} deleteCity={deleteCity}/>
        <Favorites favoritesCities={favoritesCities} deleteCity={deleteCity}/>
    </div>
  )
}

export default Weather