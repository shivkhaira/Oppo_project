import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import {AuthContext} from '../../context/auth-context'

const Already=()=>{
    const auths=useContext(AuthContext)    
    return(
        <div>
            <h1>You are logged in</h1>
            <Link to="/">HOME</Link>
            <button onClick={auths.logout}>LOGOUT</button>
        </div>
    )
}

export default Already