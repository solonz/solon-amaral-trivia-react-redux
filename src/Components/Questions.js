import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Questions extends Component {
  state = {
    id: 0,
    randomized: [],
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
  }

  setId = () => {
    this.setState((prevState) => ({
      ...prevState,
      id: prevState.id + 1,
    }));
    this.randomQuestions();
  };

  render() {
    const { questions } = this.props;
    const { id, randomized } = this.state;

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
              >
                {alt}
              </button>))}
          </div>
          <button type="button" onClick={ this.setId }>Proximo</button>
        </aside>
      </div>
    );
  }
}

Questions.propTypes = {
  questions: propTypes.arrayOf(propTypes.any).isRequired,
};
