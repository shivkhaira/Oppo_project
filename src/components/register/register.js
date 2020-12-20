import React, { useState } from 'react'

import {addUser,firestore,addScores} from '../../firebase/firebase.utils'

const SignUp=()=>{
    const [number,setNumber]=useState('')
    const [email,Setemail]=useState('')
    const [name,setName]=useState('')

    const makeData=async()=>{
        try
        {
            const no="+91"+number
            await addUser(name,email,no)
            await addScores(name,email,no)
          
            setNumber('')
            Setemail('')
            setName('')
       
        }
        catch(error)
        {
            console.error(error)
        }
    }
    const handleSubmit=async e=>
    {   e.preventDefault();
    
        var nummers = firestore.collection('users').where('phone', '==',number)
        nummers.get().then(function (querySnapshot) {
            if (querySnapshot.empty)
            {
                makeData()
            }
            else
            {
                alert("PHONE NUMBER EXISTS")
            }
         })

    }
    

    return(
        <div className='sign-up'>
            <h2 className='title'>I do not have account</h2>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <input type='number' onChange={(e)=>setNumber(e.target.value)} label="Username" placeholder="MOBILE" name='mobile' value={number} required /><br />
                <input type='email' placeholder="email" onChange={(e)=>Setemail(e.target.value)} label="Email" name='email' value={email} required /><br />
                <input type="text" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Name" /><br />
                <button type='submit'>Sign UP</button>
            </form>
        </div>
    )

}

export default SignUp