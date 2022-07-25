import React from 'react'
import {nanoid} from 'nanoid'

export default function Question({q, answerShown}) {
    const [selected, setSelected] = React.useState("")

    const options = q.answers.map(ans => {
        let id
        if (answerShown) {
            if (ans === selected) id = 'wrong'
            if (ans === q['correct_answer']) id = 'correct'
        } else if (ans === selected) id = 'selected'

        return (
            <button 
                onClick={() => answerShown || setSelected(ans)} 
                id={id}
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