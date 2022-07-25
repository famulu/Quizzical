import React from 'react';
import Question from './Question';

export default function Quiz({ questions, reset }) {
  const [answersShown, setAnswersShown] = React.useState(false);
  const [correctlySelected, setCorrectlySelected] = React.useState({});
  console.log(correctlySelected);
  return (
    <div className="quiz">
      {questions.map((question) => (
        <Question
          q={question}
          answerShown={answersShown}
          key={question.id}
          handleSelect={(id, isCorrect) =>
            setCorrectlySelected((prev) => {
              return { ...prev, [id]: isCorrect };
            })
          }
        />
      ))}
      {answersShown ? (
        <div className="quiz-output">
                  {answersShown && <span>You scored {Object.values(correctlySelected).reduce((prev, curr) => prev + curr, 0)}/{questions.length} correct answers</span>}
          <button
            className="check-answer"
            onClick={answersShown ? reset : () => setAnswersShown(true)}
          >
            {answersShown ? 'Play again' : 'Check answers'}
          </button>
        </div>
      ) : (
        <button
          className="check-answer"
          onClick={answersShown ? reset : () => setAnswersShown(true)}
        >
          {answersShown ? 'Play again' : 'Check answers'}
        </button>
      )}
    </div>
  );
}
