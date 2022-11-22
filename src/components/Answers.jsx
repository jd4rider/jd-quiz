import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'


const Answers = ({incorrectAnswers, 
                  correctAnswer, 
                  disabled, 
                  setDisabled, 
                  setScore, 
                  score,
                  setCorrect,
                  correct
                }) => { 
    const [answerClicked, setAnswerClicked] = useState('')
    const [answers, setAnswers] = useState([])
    const answerss = incorrectAnswers?.concat(correctAnswer)
    const shuffledAnswers = answerss?.sort(() => Math.random() - 0.5)
    

    const handleClick = (e) => {
        setDisabled(true)
        setAnswerClicked(e.target.value)
        if (e.target.value === correctAnswer) {
            setScore(score + 1)
            setCorrect('correct')
        } else {
            setCorrect('incorrect')
        }
    }

    useEffect(()=>{   
        setAnswers(shuffledAnswers)
    },[incorrectAnswers, correctAnswer])

    return (
        <>
            {answers?.map((answer, index) => (   
                (correct == 'incorrect' && answer == correctAnswer) 
                    ? <Button disabled={disabled} variant="success" style={{"width": '100%', 'margin': '1px'}} key={index} value={answer} onClick={(e)=>handleClick(e)} dangerouslySetInnerHTML={{__html:answer}} /> 
                : (correct == 'incorrect' && answer == answerClicked) ?
                    <Button disabled={disabled} variant="danger" style={{"width": '100%', 'margin': '1px'}} key={index} value={answer} onClick={(e)=>handleClick(e)} dangerouslySetInnerHTML={{__html:answer}} /> 
                : (correct == 'correct' && answer == correctAnswer) ?
                    <Button disabled={disabled} variant="success" style={{"width": '100%', 'margin': '1px'}} key={index} value={answer} onClick={(e)=>handleClick(e)} dangerouslySetInnerHTML={{__html:answer}} />
                : <Button disabled={disabled} variant="primary" style={{"width": '100%', 'margin': '1px'}} key={index} value={answer} onClick={(e)=>handleClick(e)} dangerouslySetInnerHTML={{__html:answer}} />

            ))}
        </>
    )
}

export default Answers;