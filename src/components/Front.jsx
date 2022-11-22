import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import Quizbox from './Quizbox'

const Front = () => {
    const [category, setCategory] = useState([])
    const [startQuiz, setStartQuiz] = useState(false)
    const [categoryPicked, setCategoryPicked] = useState({id: 0, name: 'Any Category'})
    const [numberQuestions, setNumberQuestions] = useState(10)

    const startHandler = (e) => {
        e.preventDefault()
        setStartQuiz(true)
    }

    const categoryHandler = (e) => {
        setCategoryPicked({id: e.target.value, name: e.target.options[e.target.selectedIndex].text})
    }

    const numberHandler = (e) => {
        setNumberQuestions(e.target.value)
    }

    useEffect(() => {
        fetch('https://opentdb.com/api_category.php')
            .then(response => response.json())
            .then(data => {
                setCategory(data.trivia_categories)
            })
    }, [])


    return (
        <>
            {!startQuiz && <Form onSubmit={e=>startHandler(e)}>
                <Form.Group className="mb-3">
                    <Form.Label>No. of Questions</Form.Label>
                    <br />
                    <Form.Label>(min = 5, max = 30)</Form.Label>
                    <Form.Control type="number" value={numberQuestions} min={5} max={30} onChange={e=>numberHandler(e)} />
                    <Form.Label>Quiz Category</Form.Label>
                    <Form.Select onChange={e=>categoryHandler(e)}>
                        <option>Any Category</option>
                        {category.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Start Quiz
                </Button>
            </Form>}
            {startQuiz && <Quizbox category={categoryPicked} number={numberQuestions} />}
        </>
    )
}

export default Front;