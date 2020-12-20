import React, { useState,useContext, useEffect } from 'react';
import Options from './Options'
import Timer from './Timer'
//import './Quiz.css'
import {AuthContext} from '../../context/auth-context'
import {updateScores,firestore} from '../../firebase/firebase.utils'

export default function Quiz() {

	const auths=useContext(AuthContext)

	const [played_today,setPlayed]=useState(false)
	

	const checkToday=async()=>{
		
		var docRef = firestore.collection("scores").doc(auths.user.u.phoneNumber);

		docRef.get().then(function(doc) {
			var tempDate = new Date();
				var date = tempDate.getDate()
				if (date===doc.data().quiz.last_played)
				{
					setPlayed(true)
				}
		}).catch(function(error) {
			console.log("Error getting document:", error);
		});

	}
	
	const questions = [
		{
      id:1,
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false,id:1 },
				{ answerText: 'London', isCorrect: false,id:2 },
				{ answerText: 'Paris', isCorrect: true,id:3 },
				{ answerText: 'Dublin', isCorrect: false,id:4 },
			],
		},
		{
      id:2,
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false,id:1 },
				{ answerText: 'Elon Musk', isCorrect: true,id:2 },
				{ answerText: 'Bill Gates', isCorrect: false,id:3 },
				{ answerText: 'Tony Stark', isCorrect: false,id:4 },
			],
		},
		{
      id:3,
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true,id:1 },
				{ answerText: 'Intel', isCorrect: false,id:2 },
				{ answerText: 'Amazon', isCorrect: false,id:3 },
				{ answerText: 'Microsoft', isCorrect: false,id:4 },
			],
		},
		{
      id:4,
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false,id:1 },
				{ answerText: '4', isCorrect: false,id:2 },
				{ answerText: '6', isCorrect: false,id:3 },
				{ answerText: '7', isCorrect: true,id:4 },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
  const [answer,setAnwser]=useState(false)

  const [choosed,CurrentAns]=useState(false)
  const [isCor,setCorr]=useState(false)

  const [check,setCheck]=useState(false)

	const handleAnswerOptionClick = (isCorrect,a_id) => {
      setCorr(isCorrect)
      CurrentAns(a_id)
      setCheck(true)
  };
  const checkHandler=()=>{
    setCheck(false)
    setAnwser(true)
  }
  const nextHandler=async()=>{
    CurrentAns(false)
    setCheck(false)
    if (isCor) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		}
		 else {
			setShowScore(true);
			
    }
    setAnwser(false)
  
  }

  const TimerHandler=()=>{
    setCheck(false)
    setAnwser(true)
  }

  const updateScore=async()=>{
	  var tempDate = new Date();
  var date = tempDate.getDate()
	await updateScores(auths.user.u.phoneNumber,score,date,"QUIZ")
  }

  useEffect(()=>{
	  
	if(showScore)
	{
		updateScore()
	}
	checkToday()
  },[showScore])


  if (played_today)
  {
	  return(
		  <h1>YOU PLAYED JUST TODAY</h1>
	  )
  }
	return (
		<div className='app'>
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.length}
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption,i) => (
              <Options key={i} check={check} choosed={choosed} question={questions[currentQuestion].id} answerOption={answerOption} answer={answer} handleAnswerOptionClick={handleAnswerOptionClick} />
						))}
					</div>
          {check &&<div><button onClick={checkHandler}>CHECK</button></div>}
      {answer &&<div><button onClick={nextHandler}>NEXT</button></div>}
      {!answer &&<Timer seconds={15} TimerHandler={TimerHandler} />}
				</>
			)}
 
		</div>
	);
}