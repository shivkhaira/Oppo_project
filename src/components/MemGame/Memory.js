import React, { useEffect, useState } from 'react'
import Card from './Cards'
import './Cards.css'

const cards=[
    {
        value:"A"
    },
    {
        value:"A"
    },
    {
        value:"B"
    },
    {
        value:"C"
    },
    {
        value:"C"
    },
    {
        value:"B"
    },
    

    {
        value:"Z"
    },
    {
        value:"Y"
    },
    {
        value:"Z"
    },
    {
        value:"Y"
    }
]


const Memory=()=>{

    const [total,setTotal]=useState(0)
    const [hide]=useState([])
    const [cshow,setCshow]=useState(0)
    const [view,setView]=useState(false)
    const [done,setDone]=useState([])
    const [gpay]=useState([])
    const [update,setUpdate]=useState(false)
    const [winner,setWinner]=useState(false)

    useEffect(()=>{
        if (!view)
        {
        cards.map(()=>{
            hide.push(1)
            gpay.push(0)
            return 0
        })
      setView(true)
    }
    if (done.length===2)
    {
        checkSame()
    }
    
    
    

    },[hide,done])


    const allEqual = arr => arr.every( v => v === arr[0] )

const ClickHandler=(i)=>{
    setCshow(cshow=>cshow+1)
       hide[i]=0
       checkTwo(i)
      
      setTotal(total+1)
     
}

const checkTwo=(j)=>{
    if (cshow===2)
    {
        setCshow(1)
        setDone([])
        hide.map((c,i)=>{
            hide[i]=1
            
            return 0 
        })
        hide[j]=0
    }
  
   setDone(done=>[...done,j])
}

const checkSame=()=>{
  
  
  
    if (cards[done[0]].value===cards[done[1]].value)
    {
        gpay[done[0]]=1
        gpay[done[1]]=1
        setUpdate(!update)
        if(allEqual(gpay))
        {
            setWinner(true)
        } 
    }
   
   
  
}


function remove_array_element(array, n)
 {
     
   var index = array.indexOf(n);
   if (index > -1) {
    array.splice(index, 1);
}
   return array;
 }

const HideHandler=(i)=>
{
   
    hide[i]=1
    setTotal(total+1)
    if (cshow>=1)
    {
    setDone(remove_array_element(done, i))
    setCshow(cshow-1) 
    }
    else
    {      
        setDone([])
        setCshow(0)
    }
}

if(winner)
{
    return(
        <h1>WINNER</h1>
    )
}

if (!view)
{
    return(
        <h1>LOADING!!!</h1>
    )
}

    return(
        <div className="row mx">
        {cards.map((c,i)=><Card key={i} update={update} num={i} mask={hide[i]===1?true:false} gpay={gpay} total={total} hide={HideHandler} click={ClickHandler} value={c.value} />)}
        </div>
    )
}

export default Memory