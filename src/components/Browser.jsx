import React, { useState, useEffect } from 'react';
import BrowserOption from './BrowserOption';
import { helpHttp } from '../helpers/helpHttp'
import "./Browser.css";

const api = helpHttp();
let townsList = null;

const getListOfTowns = ()=>{
    let url = "https://www.el-tiempo.net/api/json/v2/municipios";
    api.get(url).then(res=>{
        if(!res.err){
            let newData = res.map(el=>({
                IdProvince:el.CODPROV,
                IdTown:el.CODIGOINE.slice(0,5),
                name: el.NOMBRE.includes(";")? el.NOMBRE.split(";")[1]:el.NOMBRE,
                population:el.POBLACION_MUNI,
            }));
            newData.sort((a,b)=>b.population-a.population);
            townsList = newData;
        }
    });
}

const Browser = ({handleTown}) => {
    const [text, setText] = useState("");
    const [search, setSearch] = useState([]);
    const [finishSearch, setFinishSearch] = useState(false);

    const handleText = (e)=>{
        setText(e.target.value);
    }

    const handleFinish = (townName)=>{
        setFinishSearch(true);
        setText(townName);
        let selectedTown = townsList.filter((town)=>town.name === townName)[0];
        handleTown(selectedTown);
        setSearch([]);
    }


    useEffect(() => {   
        if(finishSearch){
            setFinishSearch(false);
            return;
        };
        if(!townsList){
            getListOfTowns();
        }
        if(!townsList || !text){
            setSearch([]);
            return;
        }
        let result = townsList.filter((town)=>town.name.indexOf(text)===0);
        setSearch(result);
    }, [text]);

  return (
    <div>
        <div className="browser">
            <div className='container-1'>
                <img onClick={()=>handleFinish(text)}id ="icon" src="http://localhost:3000/images/lupa.png" alt="Buscar"/>
                <input 
                    type="search" 
                    name="townSearch" 
                    id="search" 
                    placeholder='Municipio...' 
                    value={text} 
                    onChange={handleText}
                    onKeyDown={(e)=> e.key === 'Enter' && handleFinish(text)}
                />
            </div>
            
        </div>
        <div className='browserOptions'>
            {search && search.map((el,i)=> i<8 && <BrowserOption key={i} name={el.name} handleFinish={handleFinish}/>)}
        </div>
        
    </div>
  )
}

export default Browser
