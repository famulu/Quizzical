import React from 'react'
import Quiz from './components/Quiz.js'
import { nanoid } from 'nanoid'

export default function App() {
    const [hasQuizStarted, setHasQuizStarted] = React.useState(false)
    const [trivia, setTrivia] = React.useState([])
    const [count, setCount] = React.useState(0)
    
    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986')
            .then(res => res.json())
            .then(res => {
                function shuffleArray(array) {
                    for (let i = array.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [array[i], array[j]] = [array[j], array[i]];
                    }
                }
                
                return res.results.map((q, i) => {
                    let correct_answer = decodeURIComponent(q.correct_answer)
                    let incorrect_answers = q.incorrect_answers.map(ans => decodeURIComponent(ans))
                    let question = decodeURIComponent(q.question)
                    const answers = [correct_answer, ...incorrect_answers]
                    shuffleArray(answers)
                    q.id = nanoid()
                    q.answers = answers
                    q.question = question
                    q.correct_answer = correct_answer
                    q.incorrect_answers = incorrect_answers
                    return q
                })
            })
            .then(data => setTrivia(data))
    }, [count])

    return (
        <div className="main">
            {hasQuizStarted ? 
                <Quiz 
                    questions={trivia} 
                    reset={() => {
                        setHasQuizStarted(false)
                        setCount(prev => ++prev)
                    }}
                /> :
                <div className='title-page'>
                    <h1>Quizzical</h1>
                    <div>Some description if needed</div>
                    <button onClick={() => setHasQuizStarted(true)}>Start quiz</button>
                </div>
            }
        </div>
    )
}