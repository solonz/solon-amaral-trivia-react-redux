import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getTriviaApi from '../services/triviaAPI';
import Questions from '../components/Questions';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      index: 0,
    };
  }

  componentDidMount() {
    this.questionsExecute();
  }

  questionsExecute = async () => {
    const { history } = this.props;
    const result = await getTriviaApi(localStorage.getItem('token'));
    // console.log(result.results);
    // console.log(result.response_code);
    // console.log(localStorage.getItem('token'));
    const error = 3;
    if (result.response_code === error) history.push('/');
    else this.setState({ questions: result.results });
  }

  render() {
    const { questions, index } = this.state;
    return (
      <section>
        <h1>GAME</h1>
        {questions
          .length !== 0 ? <Questions question={ questions[index] } /> : <p>Carregando</p>}
      </section>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
