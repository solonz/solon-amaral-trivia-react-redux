import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      timer: 30,
      disabled: false,
      answers: [],
    };
  }

  componentDidMount() {
    this.timer();
    this.randomAswers();
  }

  timer = () => {
    const oneSec = 1000;
    setInterval(() => this.setState((prevState) => ({
      timer: prevState.timer - 1,
    }), this.clearTimer), oneSec);
  }

  clearTimer = () => {
    const { timer } = this.state;
    if (timer === 0) {
      this.setState({ disabled: true });
    }
  }

  randomAswers = () => {
    const { question } = this.props;
    const half = 0.5;
    const answers = [question.correct_answer, ...question.incorrect_answers]
      .sort(() => Math.random() - half);
    this.setState({ answers });
  }

  render() {
    const { question } = this.props;
    const { timer, disabled, answers } = this.state;
    // const half = 0.5;
    // const answers = [question.correct_answer, ...question.incorrect_answers]
    //   .sort(() => Math.random() - half);
    // console.log(answers);
    return (
      <div>
        <h2>{timer}</h2>
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{question.question}</p>
        <p>{question.correct_answer}</p>
        <div data-testid="answer-options">
          {answers.map((a, i) => {
            let datatestid = '';
            if (a === question.correct_answer) { datatestid = 'correct-answer'; } else {
              datatestid = `wrong-answer-${i}`;
            }
            return (
              <button
                key={ a }
                type="button"
                data-testid={ datatestid }
                disabled={ disabled }
              >
                {a}
              </button>);
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
