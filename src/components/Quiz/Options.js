import React from 'react'


const Options=props=>{
    if (props.answer)
    {
        return (
            <button
     key={props.answerOption.id} 
        className={props.answerOption.isCorrect?"right":"wrong"}>
          {props.answerOption.answerText}
      </button>
        )
    }
    return(
    <button
     key={props.answerOption.id} 
        className={props.choosed===props.answerOption.id ? "choose":""}
      onClick={() => props.handleAnswerOptionClick(props.answerOption.isCorrect,props.answerOption.id)}>
          {props.answerOption.answerText}
      </button>
    )
}

export default Options