import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Answers from './Answers';


const Quizbox = ({category, number}) => {
    const [quizQuestions, setQuizQuestions] = useState([])
    const [questionCount, setQuestionCount] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [nextText, setNextText] = useState('Next Question')
    const [disabled, setDisabled] = useState(false)
    const [score, setScore] = useState(0)
    const [correct, setCorrect] = useState('unanswered')
    const [win, setWin] = useState(false)
    const [categoryTitle, setCategoryTitle] = useState('')

    const nextHandler = () => {
        if(currentQuestion < questionCount - 1) setCurrentQuestion(currentQuestion + 1)
        else setWin(true)
        
        if(currentQuestion == questionCount - 2) setNextText('Finish Quiz')
        setDisabled(false)
        setCorrect('unanswered')
    }

    useEffect(()=>{
        let url = '';
        if (category.id == 0) url = `https://opentdb.com/api.php?amount=${number}`
        else url = `https://opentdb.com/api.php?amount=${number}&category=${category.id}`
        setCategoryTitle(category.name)
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setQuizQuestions(data.results)
                setQuestionCount(data.results.length)
            })
        
    },[])

    return (
        !win ? <Card>
            <Card.Header>
                Question #{currentQuestion + 1} of {questionCount}
                <br />
                Category: {categoryTitle}
            </Card.Header>
            {correct == 'correct' && <Alert key={'success'} variant={'success'}>
                That answer is Correct!
            </Alert>}
            {correct == 'incorrect' && <Alert key={'danger'} variant={'danger'}>
                That answer is Incorrect!
            </Alert>}
            <Card.Body>
                <Card.Title><div dangerouslySetInnerHTML={{__html:quizQuestions[currentQuestion]?.question}} /></Card.Title>          
            </Card.Body>
            <Answers incorrectAnswers={quizQuestions[currentQuestion]?.incorrect_answers} 
                     correctAnswer={quizQuestions[currentQuestion]?.correct_answer} 
                     disabled={disabled}
                     setDisabled={setDisabled}
                     setScore={setScore}
                     score={score}
                     setCorrect={setCorrect}
                     correct={correct}
                     />
            <br />
            {disabled && <Card.Footer>
                <Button variant="primary" onClick={nextHandler}>{nextText}</Button>
            </Card.Footer>}
        </Card> 
        : <Card>
            <Card.Header>Quiz Complete!</Card.Header>
            <Card.Body>
                <Card.Title>Score: {score} of {questionCount}</Card.Title>
                <h1>{(score/questionCount) * 100}%</h1>
            </Card.Body>
        </Card>
    );
}

export default Quizbox;