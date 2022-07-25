import React from 'react'
import Question from './Question'

export default function Quiz({questions, reset}) {
    const [answersShown, setAnswersShown] = React.useState(false)
    return (
        <div className='quiz'>
            {questions.map(question => <Question 
                q={question} 
                answerShown={answersShown} 
                key={question.id}
            />)}
            <button 
                onClick={answersShown ? reset : () => setAnswersShown(true)}
            >
                {answersShown ? 'Play again' : 'Check answers'}
            </button>
        </div>
    )
}