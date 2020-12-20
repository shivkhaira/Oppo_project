import React from 'react'

const Letter=(props)=>{
   
if (props.mask)
{
    return (
        <p>{props.C !=="_"?"_"+String.fromCharCode(160):String.fromCharCode(160)+String.fromCharCode(160)+String.fromCharCode(160)}</p>
    )
}
    return (
        <p>{props.C !=="_"?props.C:String.fromCharCode(160)+String.fromCharCode(160)+String.fromCharCode(160)}</p>
    )
}

export default Letter