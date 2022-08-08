import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Questions extends Component {
  render() {
    const { question } = this.props;
    const half = 0.5;
    const answers = [question.correct_answer, ...question.incorrect_answers]
      .sort(() => Math.random() - half);
    console.log(answers);
    return (
      <div>
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{question.question}</p>
        <p>{question.correct_answer}</p>
        <div data-testid="answer-options">
          {answers.map((a, i) => {
            let datatestid = '';
            if (a === question.correct_answer) {
              datatestid = 'correct-answer';
            } else {
              datatestid = `wrong-answer-${i}`;
            }
            const handleClick = () => (
              answers.forEach((element, idx) => {
                const button = document.getElementById(idx);
                if (element === question.correct_answer) {
                  button.className = 'correct';
                } else {
                  button.className = 'incorrect';
                }
              }));
            return (
              <button
                key={ a }
                id={ i }
                type="button"
                data-testid={ datatestid }
                onClick={ handleClick }
              >
                {a}
              </button>
            );
          })}
        </div>
      </div>

    );
  }
}

Questions.propTypes = {
  question: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
};

export default Questions;
