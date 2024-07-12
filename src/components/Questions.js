import React, { Component } from 'react';
<<<<<<< HEAD
import md5 from 'crypto-js/md5';
import propTypes from 'prop-types';
import './Questions.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { COUNT_ASSERTIONS } from '../redux/actions/typeNames';
import { setLocalStorage } from '../services/api';

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
    if (!localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
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
    const { dispatch, player } = this.props;
    dispatch({ type: COUNT_ASSERTIONS, countAssertions });
    const gravatarEmail = `https://www.gravatar.com/avatar/${md5(player.gravatarEmail).toString()}`;
    setLocalStorage(gravatarEmail, player);
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
=======
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { scoreAction, assertionAction } from '../redux/actions';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      timer: 30,
      disabled: false,
      answers: [],
      next: false,
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

  handleScore = (difficulty, { target }) => {
    const { scoreDispatch, assertionDispatch } = this.props;
    const timer = Number(document.getElementById('timer').innerHTML);
    const summary = {
>>>>>>> e80a25aaf03cceee5dd116bdbe0f808ffa0343d4
      hard: 3,
      medium: 2,
      easy: 1,
    };
<<<<<<< HEAD

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
=======
    const CONSTANT = 10;
    const equation = CONSTANT + (timer * summary[difficulty]);
    if (target.className === 'correct') {
      scoreDispatch(equation);
      assertionDispatch();
    }
    this.setState({
      next: true,
    });
  }

  handleAnswers = () => {
    this.randomAswers();
    this.setState({
      next: false,
      timer: 30,
    });
  }

  render() {
    const { question, handleNext } = this.props;
    const { timer, disabled, answers, next } = this.state;
    return (
      <div>
        <h2
          id="timer"
          data-testid="timer"
        >
          {timer}
        </h2>
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
                disabled={ disabled }
                onClick={ (event) => {
                  handleClick();
                  this.handleScore(question.difficulty, event);
                } }
              >
                {a}
              </button>
            );
          })}
        </div>
        {
          (next) && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ async () => {
                await handleNext();
                this.handleAnswers();
              } }
            >
              Next
            </button>
          )
        }
      </div>

>>>>>>> e80a25aaf03cceee5dd116bdbe0f808ffa0343d4
    );
  }
}

<<<<<<< HEAD
Questions.propTypes = {
  questions: propTypes.arrayOf(propTypes.any),
  dispatch: propTypes.func,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  player,
});

export default connect(mapStateToProps)(Questions);
=======
const mapDispatchToProps = (dispatch) => ({
  scoreDispatch: (payload) => dispatch(scoreAction(payload)),
  assertionDispatch: (payload) => dispatch(assertionAction(payload)),
});

Questions.propTypes = {
  question: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    question: PropTypes.string,
    difficulty: PropTypes.string,
  }).isRequired,
  scoreDispatch: PropTypes.func.isRequired,
  assertionDispatch: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Questions);
>>>>>>> e80a25aaf03cceee5dd116bdbe0f808ffa0343d4
