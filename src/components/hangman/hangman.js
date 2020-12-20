import React, { useEffect, useState,useContext } from 'react'
import Letter from './Letter'
import Button from './Button'
import {AuthContext} from '../../context/auth-context'
import {updateScores} from '../../firebase/firebase.utils'
import './hangman.css'
const Hangman=()=>{

    const auths=useContext(AuthContext)   

    const [guess]=useState([])
    const [correct]=useState([])
    const [total,setTotal]=useState(0)
    const [random,setRandom]=useState(100)
    const [wrong,setWrong]=useState(0)
    const [winner,setWinner]=useState(false)
    const ques=[
        {
            answer:['A','N','_','A','P','P','L','E'],
            hint:"A FRUIT",
            right:7,
            clues:['A','B','C','P','E','S','X','G','J','I','K','W','L','N']
        },
        {
            answer:['T','W','O','_','A','N','D','_','H','A','L','F','_','M','E','N'],
            hint:"A MOVIE",
            right:13,
            clues:['A','B','C','P','E','S','X','G','J','I','K','T','W','N','M','D','H','L','F','O']
        },
        {
            answer:['F','R','I','E','N','D','S'],
            hint:"A SHOW",
            right:7,
            clues:['A','B','C','P','E','S','N','X','G','J','I','K','W','F','R','D']
        },
    ]

    const button=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

    const guessHandler=(val)=>{
        let p=0
       guess.push(val)
       ques[random].answer.map((m,i)=>{
           if(m===val){
               p=1
               return(
            correct[i]=1
               )
           }
           else
           {
            setTotal(total+1)
           }
       })
       if(p===0)
       {
           setWrong(wrong+1)
       }
       else
       {
           checkWinner()
       }
     
    }

    const checkWinner=async ()=>{
        let i=0
        correct.map(c=>{
            i=i+c
        })
        if (i===ques[random].right)
        {
            
            setWinner(true)

        }
    }

    const getScore=()=>{
        if (wrong===0)
        {
            return 10
        }
        else if(wrong>0 && wrong<3)
        {
            return 8
        }
        else if(wrong>=3 && wrong<5)
        {
            return 6
        }
        else
        {
            return 4
        }
    }

    const updateScore=async()=>{
        const score= getScore()
        await updateScores(auths.user.u.phoneNumber,score)
    }

    useEffect(()=>{
        if (winner)
        {
            updateScore()
        }
        else
        {
        const rand = Math.floor(Math.random() * ques.length);
      
       setRandom(rand)
        ques[rand].answer.map(m=>{
            return(
                correct.push(0)
            )
        })
    }
       
    },[winner])

if (wrong>5)
{
    return(
    <h1>LOSER</h1>
    )
}

if (random===100)
{
    return(
        <h1>LOADING</h1>
    )
}

if (winner)
{
return(
    <h1>WINNER</h1>
)
}
    return(
        <React.Fragment>
        <div className="mx">
            {ques[random].answer.map((c,i)=><Letter key={i} update={total} corrent={correct} C={c} mask={correct[i]===1?false:true} />)}
        </div>
        <div className="mx">
        {ques[random].clues.map(b=><Button key={b} Handle={guessHandler}>{b}</Button>)}
        </div>
        <div>
           {ques[random].hint}
        </div>
     
        </React.Fragment>
    )
}

export default Hangman