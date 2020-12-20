import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import {AuthContext} from '../../context/auth-context'

const Home=()=>{

    const auths=useContext(AuthContext)

    return(
        <div>
            {auths.isLoggedin ?
            (   
                <React.Fragment>
                <Link to="/activity">Activity</Link>
                <button onClick={auths.logout}>LOGOUT</button>
                </React.Fragment>
            )   
            :
            (
                <React.Fragment>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </React.Fragment>
            )         
            }
        </div>
    )
}
export default Home