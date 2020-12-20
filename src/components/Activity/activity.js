import React from 'react'
import { Link } from 'react-router-dom'

const Activity=()=>{

    return(
        <div>
            <Link to="/quiz">QUIZ</Link><br />
            <Link to="/hang">HANGMAN</Link>
        </div>
    )
}

export default Activity