import React from 'react'
import './Cards.css'
const Card=props=>{

  

    if (props.mask)
    {
        return(
            <div className={props.gpay[props.num]===1?"column ele":"column flip"} onClick={()=>props.click(props.num)}></div>
        )
    }
    return(
        <div className={props.gpay[props.num]===1?"columnp ele":"columnp flip"} onClick={()=>props.hide(props.num)}><p className="pot">{props.value}</p></div>
    )
}

export default Card