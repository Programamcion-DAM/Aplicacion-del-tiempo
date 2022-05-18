import React from 'react'
import FavoritesTarget from './FavoritesTarget';

const Favorites = ({favoritesCities,deleteCity}) => {
    return (
        <div className={favoritesCities.length > 0? "favorites":""}>
            {favoritesCities && favoritesCities.map((city,i)=> <FavoritesTarget key={i} idProvince={city.idProvince} idTown={city.idTown} deleteCity={deleteCity}/>)}
        </div>
    )
}



export default Favorites