import React, { Component } from 'react';
import propTypes from 'prop-types';
import './Questions.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { COUNT_ASSERTIONS } from '../redux/actions/typeNames';

const CORRECT_ANSWER = 'correct-answer';
class Questions extends Component {
  state = {
    id: 0,
    randomized: [],
    isDisabled: true,
    countAssertions: 0,
    redirect: false,
    seconds: 30,
    disableAnswers: false,
    stopTimer: false,
    score: 0,
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
    const MAGICFOUR = 4;
    this.setState((prevState) => ({
      ...prevState,
      id: prevState.id + 1,
    }), ({ id } = this.state) => id <= MAGICFOUR && this.randomQuestions(),
    () => this.randomQuestions());
    this.resetTimerOnPage();
  };

  countAssertions = () => {
    const { countAssertions } = this.state;
    const { dispatch } = this.props;
    dispatch({ type: COUNT_ASSERTIONS, countAssertions });
    return (<Redirect to="/feedback" />);
  }

  assertions = (e) => {
    this.setState({ isDisabled: false });
    if (e.target.getAttribute('data-testid') === CORRECT_ANSWER) {
      this.setState((prevState) => ({
        ...prevState,
        countAssertions: prevState.countAssertions + 1,
      }));
    }
    this.handleAnswerClick(e);
  }

  showColors = (alt) => {
    const { id } = this.state;
    const { questions } = this.props;
    return (
      questions[id].correct_answer === alt
        ? CORRECT_ANSWER : 'wrong-answer'
    );
  };

  resetTimerOnPage = () => {
    const { seconds, stopTimer } = this.state;
    if (seconds === 0 || stopTimer) {
      this.setTimer();
    }
    this.setState({ seconds: 30,
      isDisabled: true,
      disableAnswers: false,
      stopTimer: false });
  }

  scoreCalculator = () => {
    const { seconds, id } = this.state;
    const { questions } = this.props;
    const { difficulty } = questions[id];
    const obj = {
      hard: 3,
      medium: 2,
      easy: 1,
    };

    return (seconds * obj[difficulty]);
  }

  handleAnswerClick = ({ target }) => {
    this.setState({ isDisabled: false, stopTimer: true, disableAnswers: true });
    if (target.dataset.testid === 'correct-answer') {
      const CALC_NUMBER = 10;
      this.setState((prevState) => ({
        ...prevState,
        score: prevState.score + CALC_NUMBER + this.scoreCalculator(),
      }), () => {
        const { dispatch } = this.props;
        const { score } = this.state;
        dispatch({ type: 'SCORE_UPDATE', score });
      });
    }
  }

  setTimer = () => {
    const intervalTime = 1000;
    const timer = setInterval(() => {
      this.setState((prevState) => ({
        ...prevState,
        seconds: prevState.seconds - 1,
      }));
      const { seconds, stopTimer } = this.state;
      if (seconds === 0 || stopTimer) {
        clearInterval(timer);
        this.setState({ disableAnswers: true, isDisabled: false });
      }
    }, intervalTime);
  };

  render() {
    const { questions } = this.props;
    const MAGICFOUR = 4;
    const { id, randomized, isDisabled, seconds, disableAnswers } = this.state;

    return (
      <div>
        {
          id <= MAGICFOUR
            ? (
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
                          ? CORRECT_ANSWER : `wrong-answer-${index}` }
                        type="button"
                        key={ index }
                        className={ !isDisabled ? this.showColors(alt) : null }
                        onClick={ (e) => this.assertions(e) }
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
                  <p>
                    {
                      seconds
                    }
                  </p>
                </aside>
              </div>
            )
            : this.countAssertions()
        }
      </div>
    );
  }
}

Questions.propTypes = {
  questions: propTypes.arrayOf(propTypes.any),
  dispatch: propTypes.func,
}.isRequired;

export default connect()(Questions);
