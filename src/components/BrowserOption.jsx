import React from 'react'
import "./Browser.css";

const BrowserOption = ({name,handleFinish}) => {
    return (
    <div>
        <p className='browserOption' onClick={()=>handleFinish(name)}>{name}</p>
    </div>
  )
}

export default BrowserOption