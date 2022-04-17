import React from 'react'
import ZoneWather from './ZoneWather';


const Favorites = ({favoritesCities,deleteCity}) => {

    return (
        <div className='favorites'>
            {favoritesCities && favoritesCities.map((city,i)=> <ZoneWather key={i} idProvince={city.idProvince} idTown={city.idTown} deleteCity={deleteCity}/>)}
        </div>
    )
}

export default Favorites