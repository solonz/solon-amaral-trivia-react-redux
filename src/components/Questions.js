import React, { Component } from 'react';
import propTypes from 'prop-types';
import './Questions.css';

export default class Questions extends Component {
  state = {
    id: 0,
    randomized: [],
    isDisabled: true,
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
    this.setState((prevState) => ({
      ...prevState,
      id: prevState.id + 1,
    }), () => this.randomQuestions());
  };

  showColors = (alt) => {
    const { id } = this.state;
    const { questions } = this.props;
    return (
      questions[id].correct_answer === alt
        ? 'correct-answer' : 'wrong-answer'
    );
  };

  render() {
    const { questions } = this.props;
    const { id, randomized, isDisabled } = this.state;

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
    );
  }
}

Questions.propTypes = {
  questions: propTypes.arrayOf(propTypes.any).isRequired,
};
