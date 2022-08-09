import React, { Component } from 'react';
import propTypes from 'prop-types';
import './Questions.css';

export default class Questions extends Component {
  state = {
    id: 0,
    randomized: [],
    isDisabled: true,
    seconds: 30,
    disableAnswers: false,
  }

  componentDidMount() {
    this.randomQuestions();
    this.setTimer();
  }

  randomQuestions = () => {
    const NUMBER = 0.5;
    const { id } = this.state;
    const { questions } = this.props;
    const answersArr = [questions[id].correct_answer, ...questions[id].incorrect_answers];
    answersArr.sort(() => Math.random() - NUMBER);
    this.setState({ randomized: answersArr, isDisabled: true });
  }

  setId = () => {
    this.setState((prevState) => ({
      ...prevState,
      id: prevState.id + 1,
    }), () => this.randomQuestions());
    this.resetTimerOnPage();
  };

  showColors = (alt) => {
    const { id } = this.state;
    const { questions } = this.props;
    return (
      questions[id].correct_answer === alt
        ? 'correct-answer' : 'wrong-answer'
    );
  };

  resetTimerOnPage = () => {
    const { seconds } = this.state;
    this.setState({ seconds: 30, isDisabled: true, disableAnswers: false });
    if (seconds === 0) {
      this.setTimer();
    }
  }

  setTimer = () => {
    const intervalTime = 1000;
    const timer = setInterval(() => {
      this.setState((prevState) => ({
        ...prevState,
        seconds: prevState.seconds - 1,
      }));
      const { seconds } = this.state;
      if (seconds === 0) {
        clearInterval(timer);
        this.setState({ disableAnswers: true, isDisabled: false });
      }
    }, intervalTime);
  };

  render() {
    const { questions } = this.props;
    const { id, randomized, isDisabled, seconds, disableAnswers } = this.state;

    return (
      <div>
        <aside>
          <p data-testid="question-category">{questions[id].category}</p>
          <p data-testid="question-text">{questions[id].question}</p>
        </aside>
        <aside>
          <div data-testid="answer-options">
            {randomized.map((alt, index) => (
              <button
                data-testid={ questions[id].correct_answer === alt
                  ? 'correct-answer' : `wrong-answer-${index}` }
                type="button"
                key={ index }
                className={ !isDisabled ? this.showColors(alt) : null }
                onClick={ () => this.setState({ isDisabled: false }) }
                disabled={ disableAnswers }
              >
                {alt}
              </button>))}
          </div>
          {!isDisabled
          && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.setId }
            >
              Next
            </button>
          )}
        </aside>
        <div>
          <p>
            {
              seconds
            }
          </p>
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  questions: propTypes.arrayOf(propTypes.any).isRequired,
};
