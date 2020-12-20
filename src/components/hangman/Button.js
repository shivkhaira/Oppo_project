import React, { useState } from 'react'

const Button=(props)=>{

    const [disable,setDisable]=useState(false)

    const Handler=(cn)=>{
        setDisable(true)
        props.Handle(cn)
    }

  
    if (disable)
    {
        return(
            <button disabled>{props.children}</button>
        )  
    }
    return(
        <button onClick={()=>Handler(props.children)}>{props.children}</button>
    )
    }

    export default Button