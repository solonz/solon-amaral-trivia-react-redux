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
  }

  componentDidMount() {
    this.randomQuestions();
  }

  randomQuestions = () => {
    const NUMBER = 0.5;
    const { id } = this.state;
    const { questions } = this.props;
    const qualquer = [questions[id].correct_answer, ...questions[id].incorrect_answers];
    qualquer.sort(() => Math.random() - NUMBER);
    this.setState({ randomized: qualquer });
    this.setState({ isDisabled: true });
  }

  setId = () => {
    const MAGICFOUR = 4;
    this.setState((prevState) => ({
      ...prevState,
      id: prevState.id + 1,
    }), ({ id } = this.state) => id <= MAGICFOUR && this.randomQuestions());
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
  }

  showColors = (alt) => {
    const { id } = this.state;
    const { questions } = this.props;
    return (
      questions[id].correct_answer === alt
        ? CORRECT_ANSWER : 'wrong-answer'
    );
  };

  render() {
    const { questions } = this.props;
    const { id, randomized, isDisabled } = this.state;
    const MAGICFOUR = 4;

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
