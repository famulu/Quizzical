import React from 'react'
import {nanoid} from 'nanoid'

export default function Question({q, answerShown, handleSelect}) {
    const [selected, setSelected] = React.useState("")

    const options = q.answers.map(ans => {
        let className
        if (answerShown) {
            className = 'shown'
            if (ans === selected) className = 'wrong'
            if (ans === q['correct_answer']) className = 'correct'
        } else if (ans === selected) className = 'selected'

        return (
            <button 
                onClick={() => {
                    if (!answerShown) {
                        setSelected(ans)
                        handleSelect(q.id, ans === q['correct_answer'])
                    }
                }} 
                className={`answer-button ${className}`}
                key={nanoid()}
            >
            {ans}
            </button>
        )
    })
    return (
        <div className='question'>
            <p>{q.question}</p>
            <div className='answers'>
                {options}
            </div>
            <hr/>
        </div>
    )
}